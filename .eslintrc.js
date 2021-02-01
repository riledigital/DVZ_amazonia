module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'array-element-newline': [
      'warn',
      'always'
    ],
    'newline-per-chained-call': ['warn'],
    'object-property-newline': ['error',
      {
        'allowAllPropertiesOnSameLine': false
      }]
  }
};
