import { createApp } from "vue";
import VueConfetti from "vue-confetti";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App";
import { router } from "./config/routes";

import "./style.scss";

createApp(App).use(router).use(VueQueryPlugin).use(VueConfetti).mount("#app");
