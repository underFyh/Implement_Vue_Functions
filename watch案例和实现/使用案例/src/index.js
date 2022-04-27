
new Vue({
    el: '#app',
    data() {
        return {
            order: 0,
            question: {
                id: '',
                question: '',
                items: []
            },
            myAnswer: []
        }
    },
    template: `
      <div v-if="myAnswer.length > 0">
         答案展示:
         <ul>
            <li v-for="(item, index) of myAnswer" :key="index">
                <h1>题目id: {{ item.id }}</h1>
                <p>题目:{{ item.question }}</p>
                <p>你的答案:{{ item.userAnswer }}</p>
                <p>正确答案:{{ item.answer }}</p>
                <p>是否正确:{{ item.isRight ? '正确': '错误' }}</p>
            </li>
        </ul>
      </div>
      <div v-else>
         <h1>当前题目编号: {{ question.id }}</h1>
         <p>{{ question.question }}</p>
         <button v-for="item of question.items" :key="item" @click="submit(item)">
            {{ item }}
         </button>
     </div>
    
    `,
    mounted() {
        this.getQuestion(this.order);
    },
    watch: {
        order(newVal,oldVal) {
            this.getQuestion(newVal);
        }
    },
    methods: {
        submit(answer) {
            let params = `order=${this.order}&userAnswer=${answer}`;
            console.log(params);
            axios.post('http://127.0.0.1:3333/upLoadAnswer', params).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.order++;
                }
            })
        },
        getQuestion(order) {
            // 需要qs.stringify, 这里简单拼写一下
            let params = 'order=' + order;
            axios.post('http://127.0.0.1:3333/getQuestion', params).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.question = res.data.data;
                } else {
                    this.myAnswer = res.data.data;
                }
            })
        }
    }
})
