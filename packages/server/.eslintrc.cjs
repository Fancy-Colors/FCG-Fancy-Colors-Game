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
    'n/no-extraneous-import': [
      'error',
      {
        allowModules: ['@remix-run/router'],
      },
    ],
  },
  overrides: [
    {
      files: '*.cjs',
      globals: {
        module: 'writable',
        exports: 'writable',
      },
    },
  ],
};
