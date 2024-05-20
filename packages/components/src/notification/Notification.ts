import { dynamicCreate } from "@simple/utils";
import Notification from "./Notification.vue";
import type { VNode } from "vue";
import type { NotificationServiceProps, NotificationServiceOpen, NotificationServiceCall } from "./types";

let _notificationInstance: VNode;

function notification(props?: NotificationServiceProps) {
  _notificationInstance = _notificationInstance || dynamicCreate(Notification, props);

  document.body.appendChild(_notificationInstance.el as HTMLElement);

  const vm = _notificationInstance.component!;

  const open = (notice: NotificationServiceOpen) => vm.exposed!.handleAdd(notice);
  const info = (notice: NotificationServiceCall) => vm.exposed!.handleAdd({ ...notice, type: "info" });
  const success = (notice: NotificationServiceCall) => vm.exposed!.handleAdd({ ...notice, type: "success" });
  const warning = (notice: NotificationServiceCall) => vm.exposed!.handleAdd({ ...notice, type: "warning" });
  const error = (notice: NotificationServiceCall) => vm.exposed!.handleAdd({ ...notice, type: "error" });

  return {
    open,
    info,
    success,
    warning,
    error
  };
}

export default notification;
