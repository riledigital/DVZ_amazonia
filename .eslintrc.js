module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    semi: ['error'],
    indent: ['error', 2],
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': ['error'],
    'no-multi-spaces': ['error'],
    'space-before-blocks': ['error'],
    'no-irregular-whitespace': ['error'],
    quotes: ['error', 'single'],
    'object-property-newline': ['error'],
    'quote-props': ['error', 'as-needed'],
    'object-curly-newline': ['error', 'always']
  }
};
