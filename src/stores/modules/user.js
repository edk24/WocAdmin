import { getUserInfo, login } from "@/api/system/auth"
import { clearAuthInfo, getToken } from "@/utils/auth"
import { defineStore } from "pinia"
import cache from "@/utils/cache"
import md5 from 'js-md5'
import { TOKEN_KEY } from "@/enums/cacheEnums"
import { isExternal } from "@/utils/url"
import { MenuType } from "@/enums/appEnums"
import { RouterView } from "vue-router"
import Layout from '@/components/layout/index.vue'
import { shallowRef } from 'vue'

export function filterAsyncRoutes(routes, firstRoute = true) {
    return routes.map((route) => {
        const routeRecord = createRouteRecord(route, firstRoute)
        if (route.children != null && route.children && route.children.length) {
            routeRecord.children = filterAsyncRoutes(route.children, false)
        }
        return routeRecord
    })
}

export function createRouteRecord(route, firstRoute) {
    route.component = loadRouteView(route.component)
    return route
}

export function loadRouteView(component) {
    try {
        if (component == 'Layout') {
            return shallowRef(Layout)
        } else if (component == 'InnerLink') {
            // TODO
        } else {
            return loadView('system/admin/index.vue')
        }

        throw Error(`找不到组件${component}，请确保组件路径正确`)
    } catch (error) {
        console.error(error)
        return RouterView
    }
}

export const loadView = (view) => {
    return () => import(`../../views/${view}.vue`)
}

export function findFirstValidRoute(routes) {
    for (const route of routes) {
        if (route.meta?.type == MenuType.MENU && !route.meta?.hidden && !isExternal(route.path)) {
            return route.name
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
    state: () => ({
        token: getToken() || '',
        userInfo: {},
        routes: [],
        perms: []
    }),
    getters: {
        isLogin(state) {
            return !!state.token
        }
    },
    actions: {
        resetState() {
            this.token = ''
            this.userInfo = {}
            this.perms = []
        },

        login(account, password) {
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

        logout() {
            return new Promise((resolve, reject) => {
                clearAuthInfo()
                resolve(1)
            })
        },

        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((data) => {
                        this.userInfo = data.data.user
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