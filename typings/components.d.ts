import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SDemo: typeof import("../packages/components")["SDemo"];
  }
}
export {};
