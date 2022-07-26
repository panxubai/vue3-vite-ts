import vue from "vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/pages/home/index.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});



export default router;