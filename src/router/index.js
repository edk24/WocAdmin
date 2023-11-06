import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

// 创建路由
const router = createRouter({
    history: createWebHashHistory(''),
    routes: routes,
})

// 重置路由
export function resetRouter() {
    router.removeRoute('/woc')
    // const { routes } = useUserStore()
    // routes.forEach((route) => {
    //     const name = route.name
    //     if (name && router.hasRoute(name)) {
    //         router.removeRoute(name)
    //     }
    // })
}

export default router