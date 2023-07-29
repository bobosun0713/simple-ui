import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SDemo: typeof import("../packages/components")["SDemo"];
    SButton: typeof import("../packages/components")["SButton"];
  }
}
export {};
