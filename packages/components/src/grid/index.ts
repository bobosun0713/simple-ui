import { withInstall } from "@simple/utils";
import Grid from "./Grid.vue";
import GridItem from ".//GridItem.vue";

const SGrid = withInstall(Grid);
const SGridItem = withInstall(GridItem);

export { SGrid, SGridItem };
export default { SGrid, GridItem };
