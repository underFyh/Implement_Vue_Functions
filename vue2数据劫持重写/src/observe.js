import { Observer } from "./Observer";

function observe(data) {
    // 如果data不是对象并且为null则返回, data必须是对象或者数组
    if(typeof data !== 'object' || data === null) return;
    return new Observer(data);
}

export {
    observe
}
