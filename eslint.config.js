import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginJest from 'eslint-plugin-jest'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintReact from 'eslint-plugin-react'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'
// import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    ignores: ['node_modules', 'dist', '**/*.config.js'],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      'react-hooks': pluginReactHooks,
      // 'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
      import: pluginImport,
      jest: pluginJest,
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...pluginReactHooks.configs.recommended?.rules,
    },
  },
  {
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      curly: ['error', 'all'],
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }],
    },
  },
]
