import { withInstall } from "@simple/utils";
import Skeleton from "./Skeleton.vue";
import SkeletonItem from "./SkeletonItem.vue";

const SSkeleton = withInstall(Skeleton);
const SSkeletonItem = withInstall(SkeletonItem);

export { SSkeleton, SSkeletonItem };
export default { SSkeleton, SSkeletonItem };
