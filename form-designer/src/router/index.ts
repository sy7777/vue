import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { FormDesign, AboutView } from "@/views";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "form",
    component: FormDesign,
  },
  {
    path: "/form",
    name: "form",
    component: FormDesign,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
