import { observe } from "./observe";

function defineReactiveData(data, key, value) {
    // 观察data内部数据是否还是对象
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            console.log('get:' + value);
            return value
        },
        set(newVal) {
            if (newVal === value) return;
            console.log('set:' + newVal);
            // 新增数据如何还是对象则继续观察
            observe(newVal);
            // -- get取值是根据value这个变量, 如果修改这个变量则get也会改变
            // 给value设置新值,导致get也会改变, 所以打印结果也是正确的
            // 不能直接修改data[key] = newVal会导致死循环, 只能结合get的value来改变新返回值 --
            value = newVal;
        }
    })
}

export {
    defineReactiveData
}
