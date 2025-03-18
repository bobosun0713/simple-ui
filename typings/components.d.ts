import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    SButton: (typeof import("../packages/components"))["SButton"];
    SCollapse: (typeof import("../packages/components"))["SCollapse"];
    SCollapseItem: (typeof import("../packages/components"))["SCollapseItem"];
    SIcon: (typeof import("../packages/components"))["SIcon"];
    STooltip: (typeof import("../packages/components"))["STooltip"];
    STable: (typeof import("../packages/components"))["STable"];
    STableColumn: (typeof import("../packages/components"))["STableColumn"];
    SPagination: (typeof import("../packages/components"))["SPagination"];
    SMessage: (typeof import("../packages/components"))["SMessage"];
    SDivider: (typeof import("../packages/components"))["SDivider"];
    SDialog: (typeof import("../packages/components"))["SDialog"];
    SGrid: (typeof import("../packages/components"))["SGrid"];
    SGridItem: (typeof import("../packages/components"))["SGridItem"];
    SRow: (typeof import("../packages/components"))["SRow"];
    SCol: (typeof import("../packages/components"))["SCol"];
    SBackTop: (typeof import("../packages/components"))["SBackTop"];
    SBreadcrumb: (typeof import("../packages/components"))["SBreadcrumb"];
    SField: (typeof import("../packages/components"))["SField"];
    SLink: (typeof import("../packages/components"))["SLink"];
    SContainer: (typeof import("../packages/components"))["SContainer"];
    SHeader: (typeof import("../packages/components"))["SHeader"];
    SAside: (typeof import("../packages/components"))["SAside"];
    SMain: (typeof import("../packages/components"))["SMain"];
    SFooter: (typeof import("../packages/components"))["SFooter"];
    SPopper: (typeof import("../packages/components"))["SPopper"];
  }

  interface ComponentCustomProperties {
    $loading: (typeof import("../packages/components"))["SLoadingService"];
    $notification: (typeof import("../packages/components"))["SNotificationService"];
    $message: (typeof import("../packages/components"))["SMessageService"];
    $dialog: (typeof import("../packages/components"))["SDialogService"];
  }
}
export {};
