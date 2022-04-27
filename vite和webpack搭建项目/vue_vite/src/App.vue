<template>
  <div>
      <div class="sys">
          <span>{{x}}</span>
          <span>+</span>
          <span>{{y}}</span>
          <span>=</span>
          <span>{{ result }}</span>
      </div>
      <div>
          <input type="number" v-model="x">
          <input type="number" v-model="y">
      </div>
      <div>
          <button @click="handleType('add')">+</button>
          <button @click="handleType('minus')">-</button>
      </div>
  </div>
</template>

<script>
export default  {
    data() {
        return {
            x: 1,
            y: 2,
            type: 'add'
        }
    },
    mounted() {
        console.log(this)
    },
    computed: {
       result() {
           let x = Number(this.x);
           let y = Number(this.y);
           switch (this.type) {
               case "add":
                   return x + y;
               case "minus":
                   return x - y;
               default:
                   break;
           }
       }
   },
    methods: {
        handleType(type) {
            switch (type) {
                case 'add':
                    this.type = 'add';
                    break;
                case 'minus':
                    this.type = 'minus';
                    break;
            }
        }
    }
}
</script>

