import HomeView from '../views/HomeView.vue';
import OverlayView from '../views/OverlayView.vue';
import PostGameStats from '../views/PostGameStats.vue';
import DashboardView from '../views/DashboardView.vue';
import AuthLogin from '../views/AuthLogin.vue';
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/overlay/:game',
        name: 'overlay',
        component: OverlayView
    },
    {
        path: '/post-game-stats/:game',
        name: 'post-game-stats',
        meta: { transition: 'fade' },
        component: PostGameStats
    },
    {
        path: '/dashboard/:game',
        name: 'dashboard',
        component: DashboardView
    },
    {
        path: '/auth/login',
        name: 'auth-login',
        component: AuthLogin
    }
]

export default routes;
