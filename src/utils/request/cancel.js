import axios from 'axios';

const cancelerMap = new Map();

class AxiosCancel {
    static createInstance() {
        return new AxiosCancel();
    }

    add(config) {
        this.remove(config);
        const url = this.getUrKey(config);
        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken((cancel) => {
                if (!cancelerMap.has(url)) {
                    cancelerMap.set(url, cancel);
                }
            });
    }

    remove(config) {
        const url = this.getUrKey(config);
        if (cancelerMap.has(url)) {
            const cancel = cancelerMap.get(url);
            cancel && cancel(url);
            cancelerMap.delete(url);
        }
    }

    getUrKey(config) {
        return `${config.method}-${config.url}`;
    }
}

const axiosCancel = AxiosCancel.createInstance();

export default axiosCancel;