import { withInstallFunction } from "@simple/utils";
import Message from "./Message";

const SMessage = withInstallFunction(Message, "$message");
export { SMessage };
export default SMessage;
