import { TOKEN_KEY } from '@/enums/cacheEnums'
import { resetRouter } from '@/router'
import cache from './cache'
import useUserStore from '@/stores/modules/user'

export function getToken() {
    return cache.get(TOKEN_KEY)
}

export function clearAuthInfo() {
    const userStore = useUserStore()
    // const tabsStore = useTabsStore()
    userStore.resetState()
    // tabsStore.resetState()
    cache.remove(TOKEN_KEY)
    resetRouter()
}
