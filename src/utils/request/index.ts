import { merge } from 'lodash'
import { baseUrl, urlPrefix } from '@/config'
import { Axios } from './axios'
import { ContentTypeEnum, RequestCodeEnum, RequestMethodsEnum } from '@/enums/requestEnums'
import type { AxiosConfig, AxiosHooks } from './type'
import { getToken } from '../auth'
import feedback from '../feedback'
import useUserStore from '@/stores/modules/user'
import NProgress from 'nprogress'
import router from '@/router/index'
import { PageEnum } from '@/enums/pageEnum'

// 处理axios的钩子函数
const axiosHooks: AxiosHooks = {
    requestInterceptorsHook(config) {
        NProgress.start()
        const { withToken } = (config as AxiosConfig).requestOptions
        const params = config.params || {}
        const headers = config.headers || {}

        // 添加token
        if (withToken) {
            const token = getToken()
            headers.token = token
        }
        // POST请求下如果无data，则将params视为data
        if (
            config.method?.toUpperCase() === RequestMethodsEnum.POST &&
            !Reflect.has(config, 'data')
        ) {
            config.data = params
            config.params = {}
        }
        config.headers = headers
        return config
    },
    requestInterceptorsCatchHook(err) {
        return err
    },
    responseInterceptorsHook(response) {
        NProgress.done()
        const userStore = useUserStore()
        const { isTransformResponse, isReturnDefaultResponse } = (response.config as AxiosConfig)
            .requestOptions

        //返回默认响应，当需要获取响应头及其他数据时可使用
        if (isReturnDefaultResponse) {
            return response
        }
        // 是否需要对数据进行处理
        const { code, data, msg } = response.data
        if (!isTransformResponse) {
            if (code == RequestCodeEnum.NEED_LOGIN || code == RequestCodeEnum.TOKEN_EXPIRED || code == RequestCodeEnum.TOKEN_INVALID) {
                msg && feedback.msgError(msg)
                router.push(PageEnum.LOGIN)
                return Promise.reject(data)
            }
            return response.data
        }
        switch (code) {
            case RequestCodeEnum.SUCCESS:
                msg && feedback.msgSuccess(msg)
                return data
            case RequestCodeEnum.FAIL:
                msg && feedback.msgError(msg)
                return Promise.reject(data)
            case RequestCodeEnum.LOGIN_FAILURE:
                userStore.logout()
                return Promise.reject()
            case RequestCodeEnum.OPEN_NEW_PAGE:
                window.location.href = data.url
                return data
            case RequestCodeEnum.NEED_LOGIN:
                msg && feedback.msgError(msg)
                router.push(PageEnum.LOGIN)
                return Promise.reject(data)
            case RequestCodeEnum.TOKEN_EXPIRED:
                msg && feedback.msgError(msg)
                router.push(PageEnum.LOGIN)
                return Promise.reject(data)
            case RequestCodeEnum.TOKEN_INVALID:
                msg && feedback.msgError(msg)
                router.push(PageEnum.LOGIN)
                return Promise.reject(data)
            default:
                return data
        }
    },
    responseInterceptorsCatchHook(error) {
        NProgress.done()
        error.message && feedback.msgError(error.message)
        return Promise.reject(error)
    }
}

const defaultOptions: AxiosConfig = {
    timeout: 10 * 1000,
    // 基础接口地址
    baseURL: baseUrl,
    headers: { 'Content-Type': ContentTypeEnum.JSON },

    // 处理 axios的钩子函数
    axiosHooks: axiosHooks,
    // 每个接口可以单独配置
    requestOptions: {
        //是否返回默认的响应
        isReturnDefaultResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // 接口拼接地址
        urlPrefix: urlPrefix,
        // 忽略重复请求
        ignoreCancelToken: false,
        // 是否携带token
        withToken: true,
        // 开启重新请求机制
        isOpenRetry: true,
        // 重新请求次数
        retryCount: 2
    }
}

function createAxios(opt?: Partial<AxiosConfig>) {
    return new Axios(
        // 深度合并
        merge(defaultOptions, opt || {})
    )
}
const request = createAxios()
export default request
