module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  ignorePatterns: [
    '**/lib/**/*', // Ignore built files.
    '.eslintrc.js',
    '**/*.json',
  ],
  plugins: ['@typescript-eslint', 'import', '@typescript-eslint/eslint-plugin'],
  rules: {
    'import/no-unresolved': 0,
    'no-console': [1, { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-empty-function': [2, { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: false }],
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: true,
        allowNullish: true,
        allowRegExp: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
        checksConditionals: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': 0,
    //prettier
    'prettier/prettier': [
      1,
      {
        trailingComma: 'all',
        arrowParens: 'avoid',
        printWidth: 120,
        useTabs: false,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        proseWrap: 'always',
        endOfLine: 'auto',
        jsxSingleQuote: false,
        quoteProps: 'as-needed',
        tabWidth: 2,
      },
      {
        usePrettierrc: true,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },

  overrides: [
    {
      files: ['*.ts'],
      rules: {},
    },
  ],
};
