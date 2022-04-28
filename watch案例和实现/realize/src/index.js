import Vue from './vue';



let vm = new Vue({
    el: '#app',
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    computed: {
        total: {
            get() {
                console.log('computed 重新计算测试');
                return this.a + this.b;
            }
        }
    },
    watch: {
        a(newVal, oldVal) {
            console.log('a', newVal, oldVal);
        },
        b(newVal, oldVal) {
            console.log('b', newVal, oldVal);
        },
        total(newVal, oldVal) {
            console.log('total', newVal, oldVal);
        },
    }
})




// 测试访问计算属性 内部函数是否执行
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

// 测试设置依赖值 computed watch是否执行符合规则
setTimeout(() => {
    console.log('-----------------------');
    vm.a = 10;
    vm.a = 10;

}, 1000)

// 测试设置计算属性total
setTimeout(() => {
    console.log('-----------------------');
    vm.total = 100;

}, 2000)
