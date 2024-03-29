module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
  },
};
