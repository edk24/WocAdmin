import { getUserInfo, login } from "@/api/system/auth"
import { RouterRecord } from "@/router/type"
import { clearAuthInfo, getToken } from "@/utils/auth"
import { defineStore } from "pinia"
import cache from "@/utils/cache"
import md5 from 'js-md5'
import { TOKEN_KEY } from "@/enums/cacheEnums"
import { isExternal } from "@/utils/url"
import { MenuType } from "@/enums/appEnums"
import { RouteRecordRaw, RouterView } from "vue-router"
import Layout from '@/components/layout/index.vue'
import { shallowRef } from 'vue'

export interface UserState {
    token: string
    userInfo: Record<string, any>
    routes: any[]
    perms: string[]
}


// 过滤路由所需要的数据
export function filterAsyncRoutes(routes: any[], firstRoute = true) {
    return routes.map((route) => {
        const routeRecord = createRouteRecord(route, firstRoute)
        if (route.children != null && route.children && route.children.length) {
            routeRecord.children = filterAsyncRoutes(route.children, false)
        }
        // router(routeRecord)
        return routeRecord
    })
}

// 创建一条路由记录
export function createRouteRecord(route: any, firstRoute: boolean): any {
    route.component = loadRouteView(route.component)
    return route
}

// 动态加载组件
export function loadRouteView(component: string) {
    try {
        if (component == 'Layout') { // 布局
            return shallowRef(Layout)
        } else if (component == 'InnerLink') { // 内嵌外链
            // route.component = Layout
            // TODO 等待组件开发
        } else {
            return loadView('system/admin/index.vue')
        }

        throw Error(`找不到组件${component}，请确保组件路径正确`)
    } catch (error) {
        console.error(error)
        return RouterView
    }
}

export const loadView = (view: any) => {
    return () => import(`../../views/${view}`)
}

// 找到第一个有效的路由
export function findFirstValidRoute(routes: RouteRecordRaw[]): string | undefined {
    for (const route of routes) {
        if (route.meta?.type == MenuType.MENU && !route.meta?.hidden && !isExternal(route.path)) {
            return route.name as string
        }
        if (route.children) {
            const name = findFirstValidRoute(route.children)
            if (name) {
                return name
            }
        }
    }
}


const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        token: getToken() || '',
        // 用户信息
        userInfo: {},
        // 动态路由
        routes: [],
        // 权限
        perms: []
    }),
    getters: {
        isLogin(state: UserState) {
            return !!state.token
        }
    },
    actions: {
        // 重置状态
        resetState() {
            this.token = ''
            this.userInfo = {}
            this.perms = []
        },

        // 登录
        login(account: string, password: string) {
            return new Promise((resolve, reject) => {
                login(account.trim(), md5(password))
                    .then((data) => {
                        this.token = data.token
                        cache.set(TOKEN_KEY, this.token)
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        // 注销
        logout() {
            return new Promise((resolve, reject) => {
                clearAuthInfo()
                resolve(1)
                // logout()
                //     .then((data) => {
                //         router.push(PageEnum.LOGIN)
                //         clearAuthInfo()
                //         resolve(data)
                //     })
                //     .catch((error) => {
                //         reject(error)
                //     })
            })
        },

        // 获取用户信息
        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((data: any) => {
                        this.userInfo = data.data.user
                        // this.perms = data.permissions
                        this.routes = filterAsyncRoutes(data.data.routers)

                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
})

export default useUserStore