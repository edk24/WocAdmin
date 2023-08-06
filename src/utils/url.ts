
/**
 * 是否外部链接
 * 
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: any) {
    return /^(https?:|mailto:|tel:)/.test(path)
}