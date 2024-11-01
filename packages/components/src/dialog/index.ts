import { withInstall, withInstallFunction } from "@simple/utils";
import Dialog from "./Dialog.vue";
import DialogService from "./method";

const SDialog = withInstall(Dialog);
const SDialogService = withInstallFunction(DialogService, "$dialog");

export { SDialog, SDialogService };
export default SDialog;
