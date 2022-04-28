export function reactiveData(vm, __get__, __set__) {
    let _data = vm.$data;

    for (let key in _data) {
        Object.defineProperty(vm, key, {
            get() {
                __get__(key, _data[key])
                return _data[key];
            },
            set(newVal) {
                let oldVal = _data[key];
                if (oldVal === newVal) {
                    return;
                }
                _data[key] = newVal;
                __set__(key, newVal, oldVal)

            }
        })
    }
}
