import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/home";

const routes = [{ path: "/", component: HomePage }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
