module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-csstree-validator',
  ],
  rules: {
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: [
          'after-declaration',
          'after-comment',
          'inside-single-line-block',
        ],
      },
    ],
    'custom-property-empty-line-before': null,
    'color-function-notation': null,
    'alpha-value-notation': 'number',
    'font-weight-notation': 'numeric',
    'max-nesting-depth': 4,
    'import-notation': 'string',
    'function-no-unknown': true,

    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
      },
    ],
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'media-feature-name-no-unknown': true,

    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    'selector-no-vendor-prefix': true,
    'selector-attribute-quotes': 'always',
    'selector-max-universal': 1,
    'selector-max-specificity': '1,3,3', // id,class,type
    'selector-max-compound-selectors': 3,
    'selector-class-pattern': [
      '^[a-z][a-zA-Z]+$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be camelCase`,
      },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: (selector) =>
          `Expected id selector "${selector}" to be kebab-case`,
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],

    'plugin/declaration-block-no-ignored-properties': true,
  },
  ignoreFiles: ['public/**/*.css', 'build/**/*.css', 'dist/**/*.css'],
};
