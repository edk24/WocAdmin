export const ContentTypeEnum = {
    JSON: 'application/json;charset=UTF-8',
    FORM_DATA: 'multipart/form-data;charset=UTF-8'
};

export const RequestMethodsEnum = {
    GET: 'GET',
    POST: 'POST'
};

export const RequestCodeEnum = {
    SUCCESS: 0,
    FAIL: 1,
    LOGIN_FAILURE: -1,
    OPEN_NEW_PAGE: 2,
    TOKEN_EXPIRED: 4011,
    TOKEN_INVALID: 4010,
    NEED_LOGIN: 4001
};