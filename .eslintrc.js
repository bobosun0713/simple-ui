module.exports = {
  root: true,
  ignorePatterns: ["!.*.js", "node_modules", "simple"],
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
  plugins: ["vue", "@typescript-eslint"],

  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: [
      "./tsconfig.json",
      "./tsconfig.eslint.json",
      "./tsconfig.web.json",
      "./tsconfig.vite.json",
      "./tsconfig.vitest.json",
      "./tsconfig.examples.json"
    ],
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

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
