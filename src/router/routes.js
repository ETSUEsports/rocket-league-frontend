import HomeView from '../views/HomeView.vue'
import OverlayView from '../views/OverlayView.vue'

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
    }
]

export default routes;
