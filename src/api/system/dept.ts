import request from "@/utils/request"

/**
 * 查询部门列表
 * 
 * @param data 
 * @returns 
 */
export const deptLists = (data: {
    page?: number,
    limit?: number
}) => {
    return request.get({
        url: '/admin/sys_dept/index',
        data
    })
}

/**
 * 创建部门
 * 
 * @param data 
 * @returns 
 */
export const createDept = (data: any) => {
    return request.post({
        url: '/admin/sys_dept/create',
        data
    })
}

/**
 * 修改部门
 * @param data 
 * @returns 
 */
export const updateDept = (data: any) => {
    return request.post({
        url: '/admin/sys_dept/update',
        data
    })
}


/**
 * 删除部门
 * 
 * @param deptId 
 * @returns 
 */
export const deleteDeptById = (deptId: number) => {
    return request.post({
        url: '/admin/sys_dept/delete',
        data: {
            dept_id: deptId
        }
    })
}


/**
 * 查询部门信息
 * 
 * @param deptId 
 * @returns 
 */
export const getDeptById = (deptId: number) => {
    return request.get({
        url: '/admin/sys_dept/get',
        data: {
            dept_id: deptId
        }
    })
}