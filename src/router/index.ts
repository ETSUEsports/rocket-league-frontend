import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import CasterView from "../views/CasterView.vue";
import OverlayView from "../views/OverlayView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home Page - Example App",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/caster",
      name: "caster",
      component: CasterView,
    },
    {
      path: "/overlay",
      name: "overlay",
      component: OverlayView,
    },
  ],
});

export default router;
