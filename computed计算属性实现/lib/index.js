let Vue = (
    function () {
        // 收集计算属性对应关系
        const computedData = {};

        class Vue {
            constructor(options) {
                let {el, data, computed, template} = options;
                this.$el = document.querySelector(el);
                this.$data = data();

                this._init(this, computed, template);
            }

            // 计算属性和模板不能挂载到实例上,只能传递使用
            _init(vm, computed, template) {
                this.dataReactive(vm, template);
                this.computedReactive(vm, computed);
                this.render(vm, template);
            }

            // data响应式处理
            dataReactive(vm, template) {
                let _data = vm.$data;
                for (let key in _data) {
                    Object.defineProperty(vm, key, {
                        get() {
                            return _data[key];
                        },
                        set(newVal) {
                            // 所有逻辑枢纽
                            _data[key] = newVal;
                            _computedUpdate(vm, key);
                            vm.render(vm, template);
                        }
                    })
                }
            }

            // 处理计算属性以及绑定到实例
            computedReactive(vm, computed) {
                for (let key in computed) {
                    let des = Object.getOwnPropertyDescriptor(computed, key);
                    let desFn = des.value.get ? des.value.get : des.value;
                    computedData[key] = {
                        value: desFn.call(this),
                        get: desFn,
                        deep: _collection(desFn)
                    };

                    Object.defineProperty(vm, key, {
                        get() {
                            return computedData[key].value;
                        },
                        set(newVal) {
                            computedData[key].value = newVal
                        }
                    })
                }
                console.log(computedData);
            }

            // 模板处理
            render(vm, template) {
                let _el = vm.$el;
                _el.innerHTML = _handleTemplate(template, vm);
            }
        }

        // 处理模板
        function _handleTemplate(template, vm) {
            let reg = /\{\{(.+?)\}\}/g;
            return template.replace(reg, (node, key) => {
                return vm[key.trim()];
            })
        }

        // 根据函数里面this收集依赖
        function _collection(fn) {
            let fnStr = fn.toString(),
                reg = /this.(.+?)/g;
            // [this.a, this.b] => ['a', 'b']
            let matchedArr = fnStr.match(reg);
            return matchedArr.map(i => {
                return i.replace('this.', '')
            })
        }

        // 是否重新运行计算属性
        function _computedUpdate(vm, dataKey) {
            let computedItem;
            for (let computedKey in computedData) {
                computedItem = computedData[computedKey]
                let _dep = computedItem.deep;
                if (_dep.includes(dataKey)) {
                    let computedRes = computedItem.get.call(vm);
                    vm[computedKey] = computedRes;
                    computedItem.value = computedRes;
                }
            }
        }

        return Vue
    }
)();


let vm = new Vue({
    el: '#app',
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    template: `
        <span>{{ a }}</span>
        <span>+</span>
        <span>{{ b }}</span>
        <span>=</span>
        <span>{{ total }}</span>
        ------------------------
        <!--测试多次重复使用计算属性会不会重新计算-->
        <span>{{ total }}</span>
        <span>{{ total }}</span>
    `,
    computed: {
        total() {
            console.log('computed');
            return this.a + this.b;
        },
        total2: {
            get() {
                return this.a;
            }
        }
    }
})

// 测试
setTimeout(() => {
    vm.a = 20;
}, 2000);
