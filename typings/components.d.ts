import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: typeof import("../packages/components")["SButton"];
    SIcon: typeof import("../packages/components")["SIcon"];
  }
}
export {};
