module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {},
      typescript: {},
    },
    react: {
      version: '18.2.0',
    },
  },
  rules: {
    // import sorting
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins.
          [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages. `react` related packages come first.
          ['^react', '^\\w', '^@\\w'],
          // Internal packages.
          [
            `^(@|${[
              '@assets',
              '@components',
              '@configs',
              '@constants',
              '@hooks',
              // '@routes',
              // '@theme',
              '@services',
              '@contexts',
              // '@store',
              '@helpers',
              '@interfaces',
              '@modules',
              'src',
              'public',
            ].join('|')})(/.*|$)`,
          ],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // others
    'no-shadow': 'off', // no need, @typescript-eslint include it
    'no-unused-vars': 'off', // no need, @typescript-eslint include it
    'no-use-before-define': 'off', // no need, @typescript-eslint include it
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    camelcase: ['error', { ignoreDestructuring: true, ignoreImports: true, allow: ['trait_type'] }],
    'padding-line-between-statements': [
      "error",
      {
        blankLine: "always", 
        prev: ["const", "let", "var", "if", "expression"],
        next: "*",
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off', // duplicate of @typescript-eslint/no-unused-vars
      },
    },
  ],
};
