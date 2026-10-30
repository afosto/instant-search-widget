import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist/**',
      'i18n/**',
      'node_modules/**',
      'tmp/**',
      'rollup.config.js',
      'lintstaged.config.js',
      'prettier.config.js',
    ],
  },
  js.configs.recommended,
  unicorn.configs.recommended,
  importX.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
      'no-console': 'error',
      // `h` and `Fragment` are imported for the JSX pragma (see babel.config.js).
      'no-unused-vars': ['error', { varsIgnorePattern: '^(h|Fragment)$' }],
      // Components use PascalCase, hooks and utils camelCase. src/ is published, so no renames.
      'unicorn/filename-case': ['error', { cases: { pascalCase: true, camelCase: true } }],
      // render(null) and `return null` are idiomatic Preact.
      'unicorn/no-null': 'off',
      // props and ref are Preact terms.
      'unicorn/name-replacements': 'off',
      // The codebase consistently uses `const X = ...; export default X;`.
      'unicorn/default-export-style': 'off',
    },
  },
  prettier,
];
