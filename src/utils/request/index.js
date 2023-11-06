import { merge } from 'lodash';
import { baseUrl, urlPrefix } from '@/config';
import { Axios } from './axios';
import { ContentTypeEnum, RequestCodeEnum, RequestMethodsEnum } from '@/enums/requestEnums';
import { getToken } from '../auth';
import feedback from '../feedback';
import useUserStore from '@/stores/modules/user';
import NProgress from 'nprogress';
import router from '@/router/index';
import { PageEnum } from '@/enums/pageEnum';

const axiosHooks = {
    requestInterceptorsHook(config) {
        NProgress.start();
        const { withToken } = config.requestOptions;
        const params = config.params || {};
        const headers = config.headers || {};

        if (withToken) {
            const token = getToken();
            headers.token = token;
        }

        if (
            config.method?.toUpperCase() === RequestMethodsEnum.POST &&
            !Reflect.has(config, 'data')
        ) {
            config.data = params;
            config.params = {};
        }
        config.headers = headers;
        return config;
    },
    requestInterceptorsCatchHook(err) {
        return err;
    },
    responseInterceptorsHook(response) {
        NProgress.done();
        const userStore = useUserStore();
        const { isTransformResponse, isReturnDefaultResponse } = response.config.requestOptions;

        if (isReturnDefaultResponse) {
            return response;
        }

        const { code, data, msg } = response.data;
        if (!isTransformResponse) {
            if (code == RequestCodeEnum.NEED_LOGIN || code == RequestCodeEnum.TOKEN_EXPIRED || code == RequestCodeEnum.TOKEN_INVALID) {
                msg && feedback.msgError(msg);
                router.push(PageEnum.LOGIN);
                return Promise.reject(data);
            }
            return response.data;
        }

        switch (code) {
            case RequestCodeEnum.SUCCESS:
                msg && feedback.msgSuccess(msg);
                return data;
            case RequestCodeEnum.FAIL:
                msg && feedback.msgError(msg);
                return Promise.reject(data);
            case RequestCodeEnum.LOGIN_FAILURE:
                userStore.logout();
                return Promise.reject();
            case RequestCodeEnum.OPEN_NEW_PAGE:
                window.location.href = data.url;
                return data;
            case RequestCodeEnum.NEED_LOGIN:
                msg && feedback.msgError(msg);
                router.push(PageEnum.LOGIN);
                return Promise.reject(data);
            case RequestCodeEnum.TOKEN_EXPIRED:
                msg && feedback.msgError(msg);
                router.push(PageEnum.LOGIN);
                return Promise.reject(data);
            case RequestCodeEnum.TOKEN_INVALID:
                msg && feedback.msgError(msg);
                router.push(PageEnum.LOGIN);
                return Promise.reject(data);
            default:
                return data;
        }
    },
    responseInterceptorsCatchHook(error) {
        NProgress.done();
        error.message && feedback.msgError(error.message);
        return Promise.reject(error);
    }
};

const defaultOptions = {
    timeout: 10 * 1000,
    baseURL: baseUrl,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    axiosHooks: axiosHooks,
    requestOptions: {
        isReturnDefaultResponse: false,
        isTransformResponse: true,
        urlPrefix: urlPrefix,
        ignoreCancelToken: false,
        withToken: true,
        isOpenRetry: true,
        retryCount: 2
    }
};

function createAxios(opt) {
    return new Axios(
        merge(defaultOptions, opt || {})
    );
}
const request = createAxios();
export default request;