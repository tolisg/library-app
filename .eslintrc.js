module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off', 'windows'],
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'array-callback-return': 'off',
    'no-shadow': 'off',
    'indent': [
      'error', 2,
      { ignoredNodes: ['TemplateLiteral'] }
    ],
    'template-curly-spacing': 'off'

  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
