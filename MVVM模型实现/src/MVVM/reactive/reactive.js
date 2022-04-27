import { isObject } from '../shared/utils';
import { mutableHandles } from "./mutableHandles";

export function useReactive(target) {
    return createReactObject(target, mutableHandles)
}


function createReactObject(target, baseHandler) {
    if(!isObject(target)) {
        return target;
    }

    const observer = new Proxy(target, baseHandler);
    return observer;
}
