const successRes = (data, msg) => {
    return {
        code: 0,
        data,
        msg: msg || 'success',
    };
};
const failRes = (code = 1, data, msg) => {
    return {
        code,
        data,
        msg: msg || 'fail',
    };
};
