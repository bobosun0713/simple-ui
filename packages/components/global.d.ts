import * as components from "./src";

declare module "vue" {
  export interface GlobalComponents {
    SButton: (typeof components)["SButton"];
    SCollapse: (typeof components)["SCollapse"];
    SCollapseItem: (typeof components)["SCollapseItem"];
    SIcon: (typeof components)["SIcon"];
    STooltip: (typeof components)["STooltip"];
    STable: (typeof components)["STable"];
    STableColumn: (typeof components)["STableColumn"];
    SPagination: (typeof components)["SPagination"];
    SMessage: (typeof components)["SMessage"];
    SDivider: (typeof components)["SDivider"];
    SDialog: (typeof components)["SDialog"];
    SGrid: (typeof components)["SGrid"];
    SGridItem: (typeof components)["SGridItem"];
    SRow: (typeof components)["SRow"];
    SCol: (typeof components)["SCol"];
    SBackTop: (typeof components)["SBackTop"];
    SBreadcrumb: (typeof components)["SBreadcrumb"];
    SField: (typeof components)["SField"];
    SLink: (typeof components)["SLink"];
    SContainer: (typeof components)["SContainer"];
    SHeader: (typeof components)["SHeader"];
    SAside: (typeof components)["SAside"];
    SMain: (typeof components)["SMain"];
    SFooter: (typeof components)["SFooter"];
    SPopper: (typeof components)["SPopper"];
    SMenu: (typeof components)["SMenu"];
  }

  interface ComponentCustomProperties {
    $loading: (typeof components)["SLoadingService"];
    $notification: (typeof components)["SNotificationService"];
    $message: (typeof components)["SMessageService"];
    $dialog: (typeof components)["SDialogService"];
  }
}
