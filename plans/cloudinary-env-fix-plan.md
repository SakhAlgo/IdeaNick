# План: Исправление `cloudinaryCloudName = undefined` в Docker

## Анализ корневой причины

### Проблема

`shared/src/cloudinary.ts` (строка 1) читает `process.env` **на этапе загрузки модуля** (top-level):

```ts
const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`
```

Это выполняется **в момент первого `require()`/`import()`** этого модуля, когда:

- `shared` компилируется в `shared/dist/cloudinary.js` на этапе сборки
- При запуске backend в Docker `cloudinary.js` загружается как CJS `require('@ideanick/shared/cloudinary')` через цепочку: `backend/dist/index.js` → `router/index.js` → `upload/prepareCloudinaryUpload/index.ts` → `@ideanick/shared/cloudinary`

### Почему это ломается в Docker

**Docker Compose загружает переменные окружения из `env_file`:**

```yaml
env_file:
  - ./webapp/.env # VITE_CLOUDINARY_CLOUD_NAME=dl1hq1vib
  - ./backend/.env # CLOUDINARY_CLOUD_NAME=dz6prxy0r
  - ./.env.docker
```

В результате в `process.env` попадают обе переменные:

- `VITE_CLOUDINARY_CLOUD_NAME` (= dl1hq1vib — **из webapp/.env, для фронтенда**)
- `CLOUDINARY_CLOUD_NAME` (= dz6prxy0r — **из backend/.env, правильное значение**)

**Проблема**: Код `cloudinary.ts` использует `||`, и:

```js
process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
// 'dl1hq1vib' (из webapp/.env) || 'dz6prxy0r' (из backend/.env)
// → 'dl1hq1vib'  ← НЕПРАВИЛЬНОЕ ЗНАЧЕНИЕ!
```

`VITE_CLOUDINARY_CLOUD_NAME` из `webapp/.env` переопределяет правильный `CLOUDINARY_CLOUD_NAME` из `backend/.env`.

**Почему `undefined`?** Если `webapp/.env` НЕ содержит `VITE_CLOUDINARY_CLOUD_NAME`, а `backend/.env` содержит только `CLOUDINARY_CLOUD_NAME`, но Docker Compose не может загрузить `.env` файл по какой-то причине (например, файл не найден или проблема с путями), то обе переменные будут `undefined`.

> **Однако, есть и сценарий с разными Cloudinary аккаунтами**: `webapp/.env.example` содержит `VITE_CLOUDINARY_CLOUD_NAME=dl1hq1vib`, а `backend/.env` — `CLOUDINARY_CLOUD_NAME=dz6prxy0r`. Это **разные** Cloudinary аккаунты. Если оба попадают в `process.env`, то `cloudinaryCloudName` будет `dl1hq1vib`, а backend ожидает `dz6prxy0r`.

### Дополнительный фактор: отсутствие `.env` файлов в Docker

`.dockerignore` исключает `**/.env*`:

```
**/.env*
```

Это значит, что `webapp/.env` и `backend/.env` **физически отсутствуют** в образе. `backend/src/lib/env.ts` пытается найти их через `findEnvFilePath()`, но не находит, поэтому `dotenv.config()` не загружает переменные. Переменные поступают ТОЛЬКО через Docker Compose `env_file`.

## Схема потоков данных

```mermaid
flowchart TD
    subgraph "Host Machine"
        WE[webapp/.env<br/>VITE_CLOUDINARY_CLOUD_NAME=dl1hq1vib]
        BE[backend/.env<br/>CLOUDINARY_CLOUD_NAME=dz6prxy0r]
        DC[docker-compose.yml<br/>env_file: webapp/.env, backend/.env]
    end

    subgraph "Docker Container"
        DC -->|env_file injects| PE[process.env]
        PE -->|VITE_CLOUDINARY_CLOUD_NAME| CLOUD1[dl1hq1vib]
        PE -->|CLOUDINARY_CLOUD_NAME| CLOUD2[dz6prxy0r]

        subgraph "Module Load Time"
            CLOUDJS[shared/dist/cloudinary.js] -->|top-level evaluation| READ[process.env.VITE_CLOUDINARY_CLOUD_NAME<br/>||<br/>process.env.CLOUDINARY_CLOUD_NAME]
            READ -->|VITE_CLOUDINARY_CLOUD_NAME is present| RESULT[cloudinaryCloudName = dl1hq1vib]
            RESULT -.->|Expected: dz6prxy0r| PROBLEM[Баг!]
        end
    end
```

## Решение

### Вариант A (рекомендуемый): Использовать `sharedEnv` вместо прямого чтения `process.env`

**`shared/src/env.ts`** уже содержит `getSharedEnvVariable()`, который правильно обрабатывает оба префикса (`VITE_` и без `VITE_`):

```ts
const getSharedEnvVariable = (key: string) =>
  windowEnv[`VITE_${key}`] || windowEnv[key] || process.env[`VITE_${key}`] || process.env[key]
```

Однако `shared/src/env.ts` **тоже читает `process.env` на этапе загрузки модуля** — та же проблема.

### Вариант B (лучший): Сделать чтение `cloudinaryCloudName` ленивым (lazy)

Вместо top-level константы, читать `cloudinaryCloudName` внутри функций `getCloudinaryUploadUrl` и `getAvatarUrl`. Это гарантирует, что к моменту использования переменные окружения уже загружены.

### Вариант C (оптимальный): Комбинация sharedEnv + ленивость

Переписать `shared/src/cloudinary.ts` на использование `sharedEnv` внутри функций, а не на top-level.

## План действий

| Шаг | Действие                                                   | Файл                                                                                                      | Описание                                                 |
| --- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1   | Изменить `shared/src/cloudinary.ts`                        | Убрать top-level чтение `process.env`, заменить на вызов `sharedEnv.CLOUDINARY_CLOUD_NAME` внутри функций | [`shared/src/cloudinary.ts`](shared/src/cloudinary.ts:1) |
| 2   | Пересобрать `shared` пакет                                 | `pnpm sh build`                                                                                           | Скомпилировать TypeScript → JS                           |
| 3   | Проверить, что `shared/src/s3.ts` не имеет той же проблемы | [`shared/src/s3.ts`](shared/src/s3.ts) (если существует)                                                  | Аналогичная проверка                                     |
| 4   | Пересобрать Docker образ                                   | `pnpm dcb`                                                                                                | Проверить, что всё собирается                            |
| 5   | Запустить и проверить                                      | `pnpm dcu`                                                                                                | Убедиться, что `cloudinaryCloudName` корректный          |

### Детали изменений в `shared/src/cloudinary.ts`

```typescript
// БЫЛО (проблема):
const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`

// СТАЛО (исправление):
import { sharedEnv } from './env'

const getCloudinaryUrl = () => {
  const cloudName = sharedEnv.CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload`
}

// Или, если не хотим импортировать env (чтобы избежать круговых зависимостей):
const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
// ... но тогда убедиться, что backend НЕ загружает webapp/.env через Docker Compose
```

## Важное замечание

**Критично проверить** — `webapp/.env` (не `.example`) действительно содержит `VITE_CLOUDINARY_CLOUD_NAME=dl1hq1vib` или другая версия? Возможно, у пользователя там стоит то же значение, что в `backend/.env`, и проблема только в порядке загрузки.
