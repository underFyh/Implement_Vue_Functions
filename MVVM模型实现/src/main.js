import { createApp, useReactive } from './MVVM/index'


function App() {
    const state = useReactive({
        user: {
            name: 'is name'
        },
        num: 0,
        test: {
            a: 1
        }
    })

    const add = (num) => state.num += num;
    const min = (num) => state.num -= num;
    const changeName = (name) => state.user.name = name;

    return {
        template: `
            <div>
                <p>{{ user.name }}</p>
                <span>{{ num }}</span> 
                <button onClick="add(1)">+</button>   
                <button onClick="min(1)">-</button>
                <button onClick="changeName('fyh')">change name</button>
            </div>
        `,
        state,
        methods: {
            add,
            min,
            changeName
        }
    }
}

createApp(App(), document.getElementById('app'));
