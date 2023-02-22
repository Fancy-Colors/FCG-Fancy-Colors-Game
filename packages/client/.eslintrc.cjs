module.exports = {
  root: true,
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'shared',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  rules: {
    'react/hook-use-state': ['error', { allowDestructuredState: true }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
  },
};
