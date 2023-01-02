const baseEslint = require('../.eslintrc');
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [...baseEslint.extends],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '.eslintrc.js',
  ],
  plugins: [...baseEslint.plugins],
  rules: {
    ...baseEslint.rules,
    'import/no-unresolved': 0,
    'max-len': ['warn', { comments: 150, code: 180, tabWidth: 2 }],
    'new-cap': ['error', { capIsNew: false }],
    'require-jsdoc': [
      0,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
  },
};
