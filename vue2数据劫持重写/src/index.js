import {initState} from "./initState";

function Vue(options) {
    this._init(options);
}

// 初始化将配置项挂载到vm实例上, 并执行initState
Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;

    initState(vm);
}


let vm = new Vue({
    data() {
        return {
            arr: ['a', {b: 2}]
        }
    }
})



console.log(vm);
