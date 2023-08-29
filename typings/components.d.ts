import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: typeof import("../packages/components")["SButton"];
    SCollapse: typeof import("../packages/components")["SCollapse"];
    SIcon: typeof import("../packages/components")["SIcon"];
    STooltip: typeof import("../packages/components")["STooltip"];
  }

  interface ComponentCustomProperties {
    SLoading: typeof import("../packages/components")["SLoading"];
    SMessage: typeof import("../packages/components")["SMessage"];
  }
}
export {};
