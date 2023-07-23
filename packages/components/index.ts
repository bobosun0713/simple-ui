import type { App } from "vue";
import * as components from "./src/index";
export * from "./src/index";

export default {
  install: (app: App) => {
    for (const cmp in components) {
      app.use(components[cmp as keyof typeof components]);
    }
  }
};
