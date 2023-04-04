// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
  extends: ['shared', 'plugin:n/recommended-module'],
  rules: {
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-module': 'error',
  },
};
