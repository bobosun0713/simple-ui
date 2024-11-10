import type { App } from "vue";
import * as directives from "./src";

export default {
  install: (app: App): void => {
    for (const dir in directives) {
      app.use(directives[dir as keyof typeof directives]);
    }
  }
};
