import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OverlayView from '../views/OverlayView.vue'
import DashboardView from '../views/DashboardView.vue'
import CasterView from '../views/CasterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/overlay',
    name: 'overlay',
    component: OverlayView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/caster',
    name: 'caster',
    component: CasterView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
