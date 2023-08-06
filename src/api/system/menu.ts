import request from "@/utils/request"

/**
 * 查询菜单列表
 * 
 * @param data 
 * @returns 
 */
export const menuLists = (data: {
    page?: number,
    limit?: number
}) => {
    return request.get({
        url: '/admin/sys_menu/index',
        data
    })
}

/**
 * 创建菜单
 * 
 * @param data 
 * @returns 
 */
export const createMenu = (data: any) => {
    return request.post({
        url: '/admin/sys_menu/create',
        data
    })
}

/**
 * 修改菜单
 * @param data 
 * @returns 
 */
export const updateMenu = (data: any) => {
    return request.post({
        url: '/admin/sys_menu/update',
        data
    })
}


/**
 * 删除菜单
 * 
 * @param menuId 
 * @returns 
 */
export const deleteMenuById = (menuId: number) => {
    return request.post({
        url: '/admin/sys_menu/delete',
        data: {
            menu_id: menuId
        }
    })
}


/**
 * 查询菜单信息
 * 
 * @param menuId 
 * @returns 
 */
export const getMenuById = (menuId: number) => {
    return request.get({
        url: '/admin/sys_menu/get',
        data: {
            menu_id: menuId
        }
    })
}