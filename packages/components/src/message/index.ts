import { withInstallFunction } from "@simple/utils";
import service from "./service";

const SMessage = withInstallFunction(service, "$message");
export { SMessage as SMessageService };
export default SMessage;
