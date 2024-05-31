module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
    "prettier/prettier"
  ],
  plugins: ["vue", "@typescript-eslint"],

  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.*.json"],
    extraFileExtensions: [".vue"]
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

    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off"
  }
};
