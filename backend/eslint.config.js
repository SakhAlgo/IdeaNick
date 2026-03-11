import baseConfig from '../eslint.config.js'
import pluginNode from 'eslint-plugin-node'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    plugins: {
      node: pluginNode,
    },
  },
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },
  {
    rules: {
      curly: ['error', 'all'],
      'node/no-process-env': 'error',
    },
  },
]
