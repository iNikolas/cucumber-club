import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "./style.scss";
import App from "./App";

createApp(App).use(VueQueryPlugin).mount("#app");
