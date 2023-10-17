import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    dts({
      entryRoot: "./src",
      outDir: ["../simple/es/src", "../simple/lib/src"],
      tsconfigPath: "../../tsconfig.json"
    })
  ],
  build: {
    target: "modules",
    minify: true,
    rollupOptions: {
      input: ["src/index.ts"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          dir: "../simple/es/src",
          exports: "named",
          preserveModulesRoot: "src"
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "../simple/lib/src",
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
