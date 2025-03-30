/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
    "plugin:storybook/recommended"
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
    "vue/no-reserved-component-names": "off",
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/prop-name-casing": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "error",

    "no-console": "off",
    "no-debugger": "off",

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off"
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.mts", "*.cts", "*.tsx", "*.vue"],
      excludedFiles: ["*.stories.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error"
      }
    }
  ]
};
