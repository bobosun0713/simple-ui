import { withInstall, withInstallFunction } from "@simple/utils";
import Message from "./Message.vue";
import MessageService from "./Message";

const SMessage = withInstall(Message);
const SMessageService = withInstallFunction(MessageService, "$message");

export { SMessage, SMessageService };
export default SMessage;
