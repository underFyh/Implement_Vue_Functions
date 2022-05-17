// 初始化数据功能
function initState(vm) {
    let options = vm.$options;
    // 初始化data数据
    if (options.data) {
        initData(vm)
    }

    // 初始化computed..逻辑
    // 初始化watch..逻辑
}


function initData(vm) {
    let data = vm.$options.data;
    // 如果是函数则执行
    data = vm._data = typeof data === 'function' ? data.call(vm) : (data || {});

    for (let key in data) {
        proxyData(vm, '_data', key);
    }
}

function proxyData(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key];
        },
        set(newVal) {
            vm[target][key] = newVal;
        }
    })
}

export {
    initState
}
