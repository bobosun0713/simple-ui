import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const mjsOutput = resolve(__dirname, "../../dist/es");
const cjsOutput = resolve(__dirname, "../../dist/cjs");

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outDir: [mjsOutput, cjsOutput],
      tsconfigPath: "./tsconfig.declaration.json"
    })
  ],
  build: {
    target: "modules",
    minify: true,
    rollupOptions: {
      external: ["vue"],
      input: ["src/index.ts"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          dir: mjsOutput,
          exports: "named",
          preserveModulesRoot: "src"
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          dir: cjsOutput,
          exports: "named",
          preserveModulesRoot: "src"
        }
      ]
    },
    lib: {
      entry: "./index.ts"
    }
  }
});
