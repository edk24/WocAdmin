import request from "@/utils/request"

/**
 * 查询角色列表
 * 
 * @param data 
 * @returns 
 */
export const roleLists = (data: {
    page?: number,
    limit?: number
}) => {
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
export const createRole = (data: {
    role_key: string,
    role_name: string,
    data_scope: number
}) => {
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
export const updateRole = (data: {
    role_id: number,
    role_key: string,
    role_name: string,
    data_scope: number
}) => {
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
export const deleteRoleById = (roleId: number) => {
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
export const getRoleById = (roleId: number) => {
    return request.get({
        url: '/admin/sys_role/get',
        data: {
            role_id: roleId
        }
    })
}