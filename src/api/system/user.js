import request from "@/utils/request"


/**
 * 查询用户列表
 * 
 * @param data 
 * @returns 
 */
export const userLists = (data) => {
    return request.get({
        url: '/admin/sys_user/lists',
        data
    })
}

/**
 * 创建用户
 * 
 * @param data 
 * @returns 
 */
export const createUser = (data) => {
    return request.post({
        url: '/admin/sys_user/create',
        data
    })
}

/**
 * 修改用户
 * @param data 
 * @returns 
 */
export const updateUser = (data) => {
    return request.post({
        url: '/admin/sys_user/update',
        data
    })
}


/**
 * 删除用户
 * 
 * @param userId 
 * @returns 
 */
export const deleteUserById = (userId) => {
    return request.post({
        url: '/admin/sys_user/delete',
        data: {
            user_id: userId
        }
    })
}


/**
 * 查询用户信息
 * 
 * @param userId 
 * @returns 
 */
export const getUserById = (userId) => {
    return request.get({
        url: '/admin/sys_user/get',
        data: {
            user_id: userId
        }
    })
}