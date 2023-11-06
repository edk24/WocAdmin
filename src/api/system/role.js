import request from "@/utils/request"

/**
 * 查询角色列表
 * 
 * @param data 
 * @returns 
 */
export const roleLists = (data) => {
    return request.get({
        url: '/admin/sys_role/index',
        data
    })
}

/**
 * 创建角色
 * 
 * @param data 
 * @returns 
 */
export const createRole = (data) => {
    return request.post({
        url: '/admin/sys_role/create',
        data
    })
}

/**
 * 修改角色
 * @param data 
 * @returns 
 */
export const updateRole = (data) => {
    return request.post({
        url: '/admin/sys_role/update',
        data
    })
}


/**
 * 删除角色
 * 
 * @param roleId 
 * @returns 
 */
export const deleteRoleById = (roleId) => {
    return request.post({
        url: '/admin/sys_role/delete',
        data: {
            role_id: roleId
        }
    })
}


/**
 * 查询角色信息
 * 
 * @param roleId 
 * @returns 
 */
export const getRoleById = (roleId) => {
    return request.get({
        url: '/admin/sys_role/get',
        data: {
            role_id: roleId
        }
    })
}