const path = require('path');

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'preact', 'airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, './babel.config.js'),
    },
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    jest: false,
  },
  ignorePatterns: [
    'dist/**',
    'i18n/**',
    'node_modules/**',
    'rollup.config.js',
    'lintstaged.config.js',
    'prettier.config.js',
  ],
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'no-console': 'error',
    'no-restricted-exports': 'off',
    'import/max-dependencies': 'off',
    'import/no-namespace': 'off',
  },
};
