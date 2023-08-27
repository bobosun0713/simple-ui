import { withInstallFunction } from "@simple/utils";
import service from "./service";

const SLoading = withInstallFunction(service, "SLoadingService");
export { SLoading as SLoadingService };
export default SLoading;
