import HomeView from '../views/HomeView.vue';
import OverlayView from '../views/OverlayView.vue';
import PostGameStats from '../views/PostGameStats.vue';
import DashboardView from '../views/DashboardView.vue';
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
        path: '/post-game-stats',
        name: 'post-game-stats',
        meta: { transition: 'fade' },
        component: PostGameStats
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
    }
]

export default routes;
