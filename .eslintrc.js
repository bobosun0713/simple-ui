module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/prettier"
  ],
  plugins: ["@typescript-eslint", "vue"],

  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/prop-name-casing": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "error",

    "no-console": "off",
    "no-debugger": "off",

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
