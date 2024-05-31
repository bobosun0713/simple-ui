import { dynamicCreate } from "@simple/utils";
import Notification from "./Notification.vue";
import type { VNode } from "vue";
import type {
  NotificationServiceProps,
  NotificationServiceOpen,
  NotificationServiceCall,
  NotificationReturnType
} from "./types";

let _notificationInstance: VNode;

function notification(props?: NotificationServiceProps): NotificationReturnType {
  _notificationInstance = _notificationInstance || dynamicCreate(Notification, props);

  document.body.appendChild(_notificationInstance.el as HTMLElement);

  const vm = _notificationInstance.component!;

  function open(notice: NotificationServiceOpen): void {
    vm.exposed!.handleAdd(notice);
  }

  function info(notice: NotificationServiceCall): void {
    vm.exposed!.handleAdd({ ...notice, type: "info" });
  }

  function success(notice: NotificationServiceCall): void {
    vm.exposed!.handleAdd({ ...notice, type: "success" });
  }

  function warning(notice: NotificationServiceCall): void {
    vm.exposed!.handleAdd({ ...notice, type: "warning" });
  }

  function error(notice: NotificationServiceCall): void {
    vm.exposed!.handleAdd({ ...notice, type: "error" });
  }

  return {
    open,
    info,
    success,
    warning,
    error
  };
}

export default notification;
