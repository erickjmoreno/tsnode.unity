module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
    },
    project: './tsconfig.json',
    extraFileExtensions: ['.cjs']
  },
  settings: {
    'import/internal-regex': '^@(?!mui|emotion)',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      }
    },
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'import/no-named-as-default-member': 0,
    'import/default': 0,
    '@typescript-eslint/no-empty-interface': 'off',
    'comma-dangle': 0,
    semi: 0,
    'object-curly-newline': 0,
    'no-prototype-builtins': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'use-isnan': 'off',
    'no-restricted-globals': ['off', 'isNaN'],
    'implicit-arrow-linebreak': [0, 'below'],
    quotes: [2, 'single', 'avoid-escape'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'off',
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/consistent-type-exports': 1,
    '@typescript-eslint/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'ignore',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        arrowParens: 'always',
        trailingComma: 'all',
        useTabs: false,
        tabWidth: 2,
        semi: true,
        printWidth: 100,
      },
    ],
  },
  globals: {
    __base: 'readonly',
    global: 'readonly',
    isNaN: 'readonly',
  },
};
