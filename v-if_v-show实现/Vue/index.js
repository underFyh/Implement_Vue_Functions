let Vue = (function () {
    function Vue(options) {
        let {el, data, methods, template} = options;
        this.$el = el;
        this.$data = data();

        // 方法和模板不直接挂载到实例上
        this._init(methods, template);
    }

    Vue.prototype._init = function (methods, template) {
        let vm = this,
            eventPool = new Map(),
            infoPool = new Map();

        let container = document.createElement('div');
        container.innerHTML = template.trim()

        initData(vm, infoPool);
        initPool(container, methods, infoPool, eventPool);
        bindEvent(vm, methods, eventPool);
        render(vm, container, infoPool);

    }


    function initData(vm, infoPool) {
        let _data = vm.$data;
        for (let k in _data) {
            Object.defineProperty(vm, k, {
                get() {
                    return _data[k];
                },
                set(newVal) {
                    _data[k] = newVal;
                    // 执行upDate
                    upDate(vm, k, infoPool)
                }
            })
        }
    }

    function initPool(container, methods, infoPool, eventPool) {
        // 键名就是对应有属性的dom， 键值就是dom里面的信息
        // infoPool = { dom: { type: 'v-if', data: 'showBox1' } };
        // eventPool = { dom: {type: 'click', handleName: 'handleBox1'} };

        // 选择所有的dom节点进行分析
        let allDom = container.getElementsByTagName('*'),
            dom = null;
        for (let i = 0; i < allDom.length; i++) {
            dom = allDom[i];
            let domTypeIf = dom.getAttribute('v-if'),
                domTypeShow = dom.getAttribute('v-show'),
                domEvent = dom.getAttribute('@click');

            // 绑定infoPool数据池
            if (domTypeIf) {
                infoPool.set(dom, {type: 'v-if', data: domTypeIf})
            } else if (domTypeShow) {
                infoPool.set(dom, {type: 'v-show', data: domTypeShow})
            }

            // 绑定eventPool数据池
            if (domEvent) {
                // 这里只判断点击情况
                eventPool.set(dom, { type: 'click', fnName: domEvent })
            }

        }

        console.log(infoPool, eventPool);
    }

    function bindEvent(vm, methods, eventPool) {
       for(let event of eventPool) {
           let [ dom, info ] = event;
           // vue的methods配置都会分配到vm实例上，并且this执行为实例本身方便内部读取数据
           let fn = methods[info.fnName].bind(vm);
           vm[info.fnName] = fn;
           dom.addEventListener(info.type, fn, false);
           dom.removeAttribute('@click');
       }
    }

    function render(vm, container, infoPool) {
        let _data = vm.$data,
            _el = vm.$el;

        for(let item of infoPool) {
            let [dom, info] = item;
            switch (info.type) {
                case 'v-if':
                    info.comment = document.createComment(['v-if']);
                    let showIf = _data[info.data];
                    !showIf && dom.parentNode.replaceChild(info.comment, dom);
                    dom.removeAttribute('v-if')
                    break;
                case 'v-show':
                    let isShow = _data[info.data];
                    isShow ? dom.style.display = 'block' : dom.style.display = 'none'
                    dom.removeAttribute('v-show')
                    break;
                default:
                    break;
            }
        }

        _el.append(container);

    }

    function upDate(vm, key, infoPool) {
        let _data = vm.$data;

        for(let item of infoPool) {
            let [dom, info] = item;
            if (key === info.data) {
                switch (info.type) {
                    case 'v-if':
                        let commentDom = info.comment;
                        let showIf = _data[info.data];
                        if (showIf) {
                            commentDom.parentNode.replaceChild(dom, commentDom);
                        } else {
                            dom.parentNode.replaceChild(commentDom, dom)
                        }
                        break;
                    case 'v-show':
                        let isShow = _data[info.data];
                        isShow ? dom.style.display = 'block' : dom.style.display = 'none'
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return Vue;

})();


export default Vue;


