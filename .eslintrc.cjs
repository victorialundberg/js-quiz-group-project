module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs,ts}', 'src/**/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['**/*.js'], // Specify JavaScript files
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      // Add JavaScript-specific rules here if needed
      rules: {
        // Your JavaScript-specific rules here
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/semi': 'off',
    'arrow-spacing': ['error', { before: true, after: true }],
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'import/no-absolute-path': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'keyword-spacing': ['error', { before: true }],
    'max-len': ['error', { code: 120 }],
    'no-console': process.env.PROD ? 'warn' : 'off',
    'no-debugger': process.env.PROD ? 'warn' : 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-undef': process.env.PROD ? 'error' : 'warn',
    'no-unreachable': process.env.PROD ? 'error' : 'warn',
    'no-unused-vars': process.env.PROD ? 'error' : 'warn',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: false }],
  },
};
