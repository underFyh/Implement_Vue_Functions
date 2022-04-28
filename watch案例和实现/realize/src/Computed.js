
class Computed {
    constructor() {
        /*
        * {
        *   key: total,
        *   value: total计算结果
        *   get: total.fn,
        *   dep: ['a', 'b'] 依赖
        * }
        *
        * */
        this.computedData = [];
    }

    //
    initComputed(vm, computed) {
        for (let key in computed) {
            let itemInfo = this.formatComputedItemInfo(vm, computed, key);
            this.computedData.push(itemInfo);
            this.definedComputed(vm, key, itemInfo);
        }
    }

    // 格式化computed需要的数据
    formatComputedItemInfo(vm, computed, key) {
        let des = Object.getOwnPropertyDescriptor(computed, key),
            desFn = des.value.get ? des.value.get : des.value,
            value = desFn.call(vm),
            get = desFn.bind(vm),
            dep = this._collectDep(desFn);

        return {
            key,
            value,
            get,
            dep
        }
    }
    // 挂载到vm实例上并且进行响应式监听, 取值和设置值都从computedData的每项数据上操作
    definedComputed(vm, key, itemInfo) {
        Object.defineProperty(vm, key, {
            get() {
                return itemInfo.value;
            },
            set() {
                // 设置的时候需要进行执行一次computed
                console.log('computed set');
                itemInfo.value = itemInfo.get();
            }
        })
    }

    // 更新方法 - vm.a = 2 依赖发生变化的时候
    update(vm, key, watchCb) {
        this.computedData.forEach(i => {
            if (i.dep.includes(key)) {
                let oldVal = i.value,
                    newVal = i.get();
                i.value = newVal;
                watchCb.invoke(i.key, newVal, oldVal);
            }
        })
    }

    _collectDep(fn) {
        let matched = fn.toString().match(/this\.(.+?)/g);
        return matched.map(i => i.split('.')[1])
    }
}

export default Computed
