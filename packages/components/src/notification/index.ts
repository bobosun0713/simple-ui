import { withInstallFunction } from "@simple/utils";
import Notification from "./Notification";

const SNotification = withInstallFunction(Notification, "$notification");
export { SNotification };
export default SNotification;
