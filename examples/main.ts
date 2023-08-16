import { createApp } from "vue";
import App from "./app.example.vue";
import SimpleUI from "@simple/components";

const app = createApp(App);
app.use(SimpleUI);
app.mount("#app");
