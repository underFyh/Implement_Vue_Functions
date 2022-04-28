import { reactiveData } from "./reactive";
import Computed from "./Computed";
import Watch from "./Watch";

class Vue {
    constructor(options) {
        let { el, data, computed, watch } = options;
        this.$el = el;
        this.$data = data();
        this.$computed = new Computed();
        this.$watch = new Watch();


        this.init(this, computed, watch);
    }

    init(vm, computed, watch) {

        // 处理响应式数据
        reactiveData(vm, (key, val) => {
            // console.log('get');
        }, (key, newVal, oldVal) => {
            this.$computed.update(vm, key, this.$watch);
            this.$watch.invoke(key, newVal, oldVal);
        });

        this.$computed.initComputed(vm, computed);
        this.$watch.initWatch(vm, watch);
    }
}


export default Vue;
