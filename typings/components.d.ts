import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: typeof import("../packages/components")["SButton"];
    SDialog: typeof import("../packages/components")["SDialog"];
  }
}
export {};
