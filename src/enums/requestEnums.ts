export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data   上传资源（图片，视频）
    FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum RequestMethodsEnum {
    GET = 'GET',
    POST = 'POST'
}

export enum RequestCodeEnum {
    SUCCESS = 0,
    FAIL = 1,
    LOGIN_FAILURE = -1,
    OPEN_NEW_PAGE = 2,

    // token 已过期
    TOKEN_EXPIRED = 4011,
    // token 无效
    TOKEN_INVALID = 4010,
    // 需要登录
    NEED_LOGIN = 4001
}
