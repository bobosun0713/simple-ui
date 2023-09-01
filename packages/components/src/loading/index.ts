import { withInstallFunction } from "@simple/utils";
import service from "./service";

const SLoading = withInstallFunction(service, "$loading");
export { SLoading as SLoadingService };
export default SLoading;
