import axios from 'axios';
import { isFunction, merge, cloneDeep } from 'lodash';
import axiosCancel from './cancel';

export class Axios {
    constructor(config) {
        this.config = config;
        this.options = config.requestOptions;
        this.axiosInstance = axios.create(config);
        this.setupInterceptors();
    }

    getAxiosInstance() {
        return this.axiosInstance;
    }

    setupInterceptors() {
        if (!this.config.axiosHooks) {
            return;
        }
        const {
            requestInterceptorsHook,
            requestInterceptorsCatchHook,
            responseInterceptorsHook,
            responseInterceptorsCatchHook
        } = this.config.axiosHooks;
        this.axiosInstance.interceptors.request.use(
            (config) => {
                this.addCancelToken(config);
                if (isFunction(requestInterceptorsHook)) {
                    config = requestInterceptorsHook(config);
                }
                return config;
            },
            (err) => {
                if (isFunction(requestInterceptorsCatchHook)) {
                    requestInterceptorsCatchHook(err);
                }
                return err;
            }
        );
        this.axiosInstance.interceptors.response.use(
            (response) => {
                this.removeCancelToken(response.config);
                if (isFunction(responseInterceptorsHook)) {
                    response = responseInterceptorsHook(response);
                }
                return response;
            },
            (err) => {
                if (err.code !== 'ERR_CANCELED') {
                    this.removeCancelToken(err.config);

                    if (isFunction(responseInterceptorsCatchHook)) {
                        responseInterceptorsCatchHook(err);
                    }
                    setTimeout(() => {
                        this.retryRequest(err);
                    }, 200);
                }
                return Promise.reject(err);
            }
        );
    }

    addCancelToken(config) {
        const { ignoreCancelToken } = config.requestOptions;
        !ignoreCancelToken && axiosCancel.add(config);
    }

    removeCancelToken(config) {
        const { ignoreCancelToken } = config.requestOptions;
        !ignoreCancelToken && axiosCancel.remove(config);
    }

    retryRequest(error) {
        const config = error.config;
        const { retryCount, isOpenRetry } = config.requestOptions;
        if (!isOpenRetry && config.method?.toUpperCase() == 'POST') {
            return;
        }
        config.retryCount = config.retryCount ?? 0;

        if (config.retryCount >= retryCount) {
            return;
        }
        config.retryCount++;
        this.axiosInstance.request(config);
    }

    get(config, options) {
        return this.request({ ...config, method: 'GET' }, options);
    }

    post(config, options) {
        return this.request({ ...config, method: 'POST' }, options);
    }

    request(config, options) {
        const opt = merge({}, this.options, options);
        const axioxConfig = {
            ...cloneDeep(config),
            requestOptions: opt
        };
        const { urlPrefix } = opt;
        if (urlPrefix) {
            axioxConfig.url = `${urlPrefix}${config.url}`;
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request(axioxConfig)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}