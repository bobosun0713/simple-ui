import { withInstall } from "@simple/utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

const SCollapse = withInstall(Collapse);
const SCollapseItem = withInstall(CollapseItem);

export { SCollapse, SCollapseItem };
export default { SCollapse, SCollapseItem };
