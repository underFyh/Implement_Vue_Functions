import { observeArr } from "./observeArr";

// 这些方法会修改原数组, 但是Object.definePrototy不能监听到
const ARR_METHODS = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
]

// 获取数组原型方法, 并且创造到一个新对象中, 数组数据劫持的时候优先使用自己定义的方法,然后再去使用数组原型上的方法
let originArrMethods = Array.prototype,
    arrMethods = Object.create(originArrMethods);


// 重写原型方法
ARR_METHODS.map((m) => {
    arrMethods[m] = function () {
        console.log('arr, set');
        let args = [].slice.call(arguments),
            rt = originArrMethods[m].apply(this, args);

        // 新增参数集合
        let newArr;
        // 以下的方法有新参数
        switch (m) {
            case 'push':
            case 'unshift':
                newArr = args;
                break;
            case 'splice':
                newArr = args.slice(2);
                break;
            default:
                break;
        }


        newArr && newArr.length > 0 && observeArr(newArr);
        return rt;
    }
})

export {
    arrMethods
}
