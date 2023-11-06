import request from "@/utils/request";


/**
 * 登录
 * 
 * @param account 
 * @param password 
 */
export const login = (account, password) => {
    return request.post({
        url: "/admin/auth/login",
        data: {
            account,
            password
        }
    });
}


/**
 * 获取信息
 */
export const getUserInfo = () => request.get({ url: '/admin/auth/getInfo' }, { isTransformResponse: false });