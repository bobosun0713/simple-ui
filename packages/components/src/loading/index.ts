import { withInstall } from "@simple/utils";
import provide from "./provide";
import Loading from "./Loading.vue";

export const SLoading = withInstall(Loading, { provide });
export default SLoading;
