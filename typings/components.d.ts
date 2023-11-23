import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: typeof import("../packages/components")["SButton"];
    SCollapse: typeof import("../packages/components")["SCollapse"];
    SIcon: typeof import("../packages/components")["SIcon"];
    STooltip: typeof import("../packages/components")["STooltip"];
    STable: typeof import("../packages/components")["STable"];
    STableColumn: typeof import("../packages/components")["STableColumn"];
    SPagination: typeof import("../packages/components")["SPagination"];
    SMessage: typeof import("../packages/components")["SMessage"];
    SDivider: typeof import("../packages/components")["SDivider"];
    SDialog: typeof import("../packages/components")["SDialog"];
  }

  interface ComponentCustomProperties {
    $loading: typeof import("../packages/components")["SMessage"];
    $notification: typeof import("../packages/components")["SNotificationService"];
    $message: typeof import("../packages/components")["SMessageService"];
    $dialog: typeof import("../packages/components")["SDialogService"];
  }
}
export {};
