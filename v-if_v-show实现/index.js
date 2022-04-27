import Vue from "./Vue";


new Vue({
    el: document.getElementById('app'),
    data() {
        return {
            showBox1: true,
            showBox2: true
        }
    },
    template: `
        <div class="box1" v-if="showBox1">v-if-box1</div>
        <div class="box2" v-show="showBox2">v-show-box2</div>
        <button @click="handleBox1">切换box1</button>
        <button @click="handleBox2">切换box2</button>
    `,
    methods: {
        handleBox1() {
            this.showBox1 = !this.showBox1;
        },
        handleBox2() {
            this.showBox2 = !this.showBox2;
        }
    }
})
