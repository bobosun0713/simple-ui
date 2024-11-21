import { withInstall } from "@simple/utils";
import Mene from "./Menu.vue";
import MenuItem from "./MenuItem.vue";

const SMenu = withInstall(Mene);
const SMenuItem = withInstall(MenuItem);

export { SMenu, SMenuItem };
export default { SMenu, SMenuItem };
