module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'promise', 'unicorn'],
  overrides: [
    {
      files: ['?(*.)+(spec|test).+(ts|tsx)'],
      env: { jest: true },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'func-names': 'off',
        'max-nested-callbacks': 'off',
        'max-statements': 'off',
        'require-await': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['*.(js|cjs)'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      files: [
        'stylelint.config.cjs',
        '.eslintrc.cjs',
        'vite.config.ts',
        'jest.config.js',
      ],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
  rules: {
    // Typescript
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        leadingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'property',
        leadingUnderscore: 'allow',
        format: ['camelCase'],
      },
      {
        selector: 'method',
        leadingUnderscore: 'allow',
        format: ['camelCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Problems
    'no-undefined': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'array-callback-return': 'error',
    'no-self-compare': 'error',
    'no-duplicate-imports': 'error',

    // Suggestions
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-spread': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'no-useless-rename': 'error',
    'no-useless-concat': 'error',
    'no-lonely-if': 'error',
    'func-names': ['error', 'as-needed'],
    'new-cap': 'error',
    'no-new-wrappers': 'error',
    'require-await': 'error',
    'max-nested-callbacks': ['error', 4],
    eqeqeq: ['error', 'always'],
    'prefer-template': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    // Разрешаем debugger только в режиме разработки
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Разрешаем `console.log` только в режиме разработки
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',

    // Promises
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/no-nesting': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/always-return': 'off',

    // Unicorn
    'unicorn/better-regex': 'error',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-this-assignment': 'error',
    'unicorn/error-message': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/throw-new-error': 'error',
  },
};
