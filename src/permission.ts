import NProgress from 'nprogress'
import router from './router'
import 'nprogress/nprogress.css'
import { PageEnum } from './enums/pageEnum'
import { clearAuthInfo } from './utils/auth'
import useUserStore from './stores/modules/user'

// NProgress配置
NProgress.configure({ showSpinner: false })


// 免登录白名单
const whiteList: string[] = [PageEnum.LOGIN, PageEnum.ERROR_404]
router.beforeEach(async (to, from, next) => {
    // 开始 Progress Bar
    NProgress.start()

    const userStore = useUserStore()
    if (userStore.isLogin) {
        const hasGetUserInfo = Object.keys(userStore.userInfo).length !== 0
        if (hasGetUserInfo) {
            if (to.path === PageEnum.LOGIN) {
                next({ path: PageEnum.HOME })
            } else {
                next()
            }
        } else {
            try {
                await userStore.getUserInfo()
                const routes = userStore.routes

                // 没有菜单跳转到404页面
                if (!routes.length) {
                    await userStore.logout()
                    next(PageEnum.ERROR_404)
                    return
                }

                // 动态添加index路由
                routes.forEach((route: any) => {
                    router.addRoute('/', route)
                })
                console.log('save', to)
                // TODO 记录前次路由,  本次跳转

                next({ ...to, replace: true })
            } catch (err) {
                clearAuthInfo()
                next({ path: PageEnum.LOGIN, query: { redirect: to.fullPath } })
            }
        }
    } else if (whiteList.includes(to.path)) {

        // 在免登录白名单，直接进入
        next()
    } else {

        next({ path: PageEnum.LOGIN, query: { redirect: to.fullPath } })
    }

    // next()
})

router.afterEach(() => {
    NProgress.done()
})
