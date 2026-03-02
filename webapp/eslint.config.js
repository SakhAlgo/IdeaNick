import { dirname } from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../eslint.config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'] },

  ...baseConfig,

  {
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
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@ideanick/backend/**', '!@ideanick/backend/**/', '!@ideanick/backend/**/input'],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend',
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
