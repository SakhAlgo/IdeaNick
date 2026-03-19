import { dirname } from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../eslint.config.js'
import pluginNode from 'eslint-plugin-node'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'] },

  ...baseConfig,

  {
    plugins: {
      node: pluginNode,
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'node/no-process-env': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "lib/env"',
        },
      ],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          // Запрещаем импорт всего из @ideanick/backend, кроме /input
          patterns: [
            {
              regex: '^@ideanick/backend/(?!(.*/)?(?:input|can)$).+$',
              allowTypeImports: true,
              message: 'Импорт из бэкенда разрешен только для файлов input',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['vite.config.ts', '*.config.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
]
