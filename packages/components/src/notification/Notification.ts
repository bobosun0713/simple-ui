import notificationBus from "./bus";
import { notificationDefault } from "./props";
import type { NotificationProps } from "./types";

function notification() {
  return {
    open(note: NotificationProps) {
      notificationBus.$emit("toast-add", { ...notificationDefault, ...note });
    },
    removeAll() {
      notificationBus.$emit("toast-remove-all");
    }
  };
}

export default notification;
