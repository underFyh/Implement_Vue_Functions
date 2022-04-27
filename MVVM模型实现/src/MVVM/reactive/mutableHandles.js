import { isObject, isEqual, isKeyExist } from '../shared/utils'
import { useReactive } from "./reactive";
import { upDate } from "../render";
import { state_pool } from "../compiler/state";

const get = createGetter();
const set = createSetter();


function createGetter() {
    return function get(target, key, receiver) {
        let res = Reflect.get(target, key, receiver);

        console.log('响应式读取', key);
        // 如果属性还是一个对象则进行深度代理
        if (isObject(res)) {
            return useReactive(res);
        }
        return res;
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const keyExist = isKeyExist(target, key),
              oldValue = target[key],
              res =  Reflect.set(target, key, value, receiver);

        if (!keyExist) {
            // 之前没有这个key则为增加
            console.log('响应式增加', key, value);
        } else if(!isEqual(value, oldValue)) {
            console.log('响应式修改', key, value);
            upDate(state_pool, key, value);
        }
        return res;
    }
}

const mutableHandles = {
    get,
    set
}

export {
    mutableHandles
}
