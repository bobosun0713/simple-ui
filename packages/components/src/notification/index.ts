import { withInstallFunction } from "@simple/utils";
import service from "./service";

const SNotification = withInstallFunction(service, "$notification");
export { SNotification as SNotificationService };
export default SNotification;
