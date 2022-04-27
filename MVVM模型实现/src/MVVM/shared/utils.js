const reg_check_str = /^[\'|\"].*?[\'|\"]$/;
const reg_str = /[\'|\"]/g // 替换掉

export function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}


export function isKeyExist(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual(newVal, oldVal) {
    return newVal === oldVal;
}


export function checkType(str) {
    if (reg_check_str.test(str)) {
        // 去掉引号替换出里面的字符串
        return str.replace(reg_str, '');
    }
    // 如果是字符串布尔值
    switch (str) {
        case 'true':
            return true
        case 'false':
            return false
        default:
            break;
    }
    // 如果没有引号则是数字
    return Number(str);
}
