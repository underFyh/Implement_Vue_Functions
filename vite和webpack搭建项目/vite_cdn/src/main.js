// let { createApp } = Vue;
//
// createApp({
//     data() { return { a: 1 } },
//     template: `<h1 @click="fn">{{a}}</h1>`,
//     methods: {
//         fn() {
//             console.log(1);
//         }
//     }
// }).mount('#app');


new Vue({
    data() {
        return { x: 0 }
    },
    computed: {
        result: {
            get() {
                console.log('run result', this);
                return this.x > 2 ? '当前x值大于2' : '当前x值小于2'
            },
            set(val) {
                this.x = val;
            }
        }
    }
    ,
    template: `
        <div>
           {{ result }}
           {{ result }}
           <button @click="x++">增加</button>
           <button @click="result=4">设置x = 4</button>
        </div>
    `,
    methods: {
        add() {
            this.x++;
        }
    }
}).$mount('#app')








