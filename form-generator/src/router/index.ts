import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { 
  HomePage,
  Hsdcp,
  Reports,
} from "@/views";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      module: 'home',
    },
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
    meta: {
      module: 'reports',
    },
  },
  {
    path: "/hsdcp",
    name: "hsdcp",
    component: Hsdcp,
    meta: {
      module: 'hsdcp',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
