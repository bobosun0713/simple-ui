import { withInstall, withInstallFunction } from "@simple/utils";
import Loading from "./Loading.vue";
import LoadingService from "./method";

const SLoading = withInstall(Loading);
const SLoadingService = withInstallFunction(LoadingService, "$loading");

export { SLoading, SLoadingService };
export default SLoading;
