import { withInstall, withInstallFunction } from "@simple/utils";
import Notification from "./Notification.vue";
import NotificationService from "./method";

const SNotification = withInstall(Notification);
const SNotificationService = withInstallFunction(NotificationService, "$notification");

export { SNotification, SNotificationService };
export default SNotification;
