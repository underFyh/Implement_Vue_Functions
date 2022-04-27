import { checkType } from "../shared/utils";

// 1. 匹配出绑定事件函数名
let reg_onClick = /onClick\=\"(.+?)\"/g;
let reg_fn_name = /(.*)\(/;
let reg_fn_args = /\((.*)\)/;

// 创建唯一标识id
function markId() {
    return new Date().getTime() + parseInt(Math.random() * 10000)
}

// { type: 处理事件, mark: 这个事件对应的dom上的data-mark属性(根据这个属性来绑定对应事件), handle: 执行的函数名 }
let event_pool = [];

export function eventFormat(template) {
    template = template.replace(reg_onClick, (node, key) => {
        let _mark = markId();
        event_pool.push({ mark: _mark, type: 'click', handle: key.trim() });
        return `data-mark=${_mark}`;
    })
    return template;
}

// 2. 渲染后进行事件绑定
export function bindEvent(methods) {
    let allElement = document.querySelectorAll('*');
    let oItem;
    for(let i = 0; i < allElement.length; i++) {
        oItem = allElement[i]
        let dataMarkNum = Number(oItem.dataset.mark);
        if (dataMarkNum) {
            event_pool.forEach(event => {
                if (dataMarkNum === event.mark) {
                    oItem.addEventListener(event.type, function () {
                        // 根据event.handle来判断函数
                        console.log(event);
                        // 匹配当前dom需要的函数名
                        let fnName = event.handle.match(reg_fn_name)[1];
                        // 匹配当前函数的参数
                        let fnArgs = event.handle.match(reg_fn_args)[1];
                        fnArgs = checkType(fnArgs);
                        methods[fnName](fnArgs);
                    }, false);
                }
            })
        }
    }
}
