import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: typeof import("../packages/components")["SButton"];
    SCollapse: typeof import("../packages/components")["SCollapse"];
    SIcon: typeof import("../packages/components")["SIcon"];
    STooltip: typeof import("../packages/components")["STooltip"];
  }

  interface ComponentCustomProperties {
    $message: typeof import("../packages/components")["SLoadingService"];
    $loading: typeof import("../packages/components")["SMessageService"];
  }
}
export {};
