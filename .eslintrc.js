module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: { // 0:off, 1:warning, 2:error
  },
};
