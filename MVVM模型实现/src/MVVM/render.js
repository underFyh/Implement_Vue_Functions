import { eventFormat, bindEvent } from './compiler/event'
import { stateFormat } from './compiler/state'

export function createApp({template, state, methods}, dom) {
    dom.innerHTML = render(template, state);
    bindEvent(methods);
}


export function render(template, state) {
    // 此时模板需要进行两次处理, 一次绑定事件一次绑定数据
    template = eventFormat(template);
    template = stateFormat(template, state);
    return template;
}


export function upDate(state_pool, key, value) {
    // 获取所有的dom
    let allElement = document.querySelectorAll('*');
    let oItem;

    // 注意state_pool state的值形式以数组出现 ['name', 'age']
    state_pool.forEach(item => {
        if (item.state[item.state.length - 1] === key) {
            for (let i = 0; i < allElement.length; i++) {
                oItem = allElement[i];
                let dom_mark = parseInt(oItem.dataset.smark);
                if (item.mark === dom_mark) {
                    oItem.innerHTML = value;
                }
            }
        }
    })
}
