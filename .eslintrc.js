module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
  ],
  plugins: ["vue", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 12,
  },
  env: { browser: true, es2021: true },
  globals: {},
  rules: {},
};
