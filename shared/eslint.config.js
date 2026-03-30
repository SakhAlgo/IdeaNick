import { dirname } from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../eslint.config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    // Для JS файлов (включая eslint.config.js)
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      // Разрешаем использование any в shared
      '@typescript-eslint/no-explicit-any': 'off',
      // Отключаем node-специфичные правила для shared
      'node/no-process-env': 'off',
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
]
