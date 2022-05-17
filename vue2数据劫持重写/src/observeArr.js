import { observe } from "./observe";

function observeArr(arr) {
    // 观察数组每一项
    for (let i = 0; i < arr.length; i++) {
        observe(arr[i])
    }
}

export {
    observeArr
}
