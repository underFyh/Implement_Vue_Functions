const reg_dom = /\<.*\>\{\{(.*?)\}\}\<\/.*\>/g;
const reg_tag = /\<\/(.+)\>/;
const reg_state = /\{\{(.*?)\}\}/g;


// { mark: 唯一, state: ['key'] }
export const state_pool = [];
let o = 0;

export function stateFormat(template, state) {
    template = template.replace(reg_dom, (node, key) => {
        let _mark = parseInt(Math.random() * 10000),
            tagName = node.match(reg_tag)[1];

        state_pool.push({mark: _mark});
        return `<${tagName} data-sMark="${_mark}">{{${key}}}</${tagName}>`
    })

    template = template.replace(reg_state, (node, key) => {
        let val = key.trim();
        let valArr = val.split('.');
        let i = 0;


        while (i < valArr.length) {
            val = state[valArr[i]];
            // .语法情况下
            if (i > 0) {
                let next = state[valArr[i - 1]],
                    key = valArr[i];
                val = next[key];
            }
            i++;
        }

        // 对应上state_pool里面的值, 这里根据索引为了方便,其实对象应该更好
        state_pool[o].state = valArr;
        o++;


        return val;
    });
    return template;
}
