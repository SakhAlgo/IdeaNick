import { dirname } from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../eslint.config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ не требует импортировать React
      //   'jsx-a11y/anchor-is-valid': 'off',
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },

  //   🔹 Специальные настройки для Vite-конфига
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
]
