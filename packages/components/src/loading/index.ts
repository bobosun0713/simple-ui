import { withInstall } from "@simple/utils";
import provide from "./provide";
import Loading from "./Loading.vue";

const SLoading = withInstall(Loading);

export { SLoading, provide as SLoadingService };
export default SLoading;
