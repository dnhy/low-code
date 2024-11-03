module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["@stylistic"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: [],
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "vue/no-unused-components": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@stylistic/padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
    ],
  },
};
