import { withInstall } from "@simple/utils";
import Container from "./Container.vue";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Footer from "./Footer.vue";
import Main from "./Main.vue";

const SContainer = withInstall(Container);
const SHeader = withInstall(Header);
const SAside = withInstall(Aside);
const SFooter = withInstall(Footer);
const SMain = withInstall(Main);

export { SContainer, SHeader, SAside, SMain, SFooter };
