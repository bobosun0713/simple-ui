import type { App } from "vue";
import * as components from "./src";
import "./styles/normalize.scss";
import "./styles/base.scss";

export * from "./src";
export default {
  install: (app: App): void => {
    for (const cmp in components) {
      app.use(components[cmp as keyof typeof components]);
    }
  }
};
