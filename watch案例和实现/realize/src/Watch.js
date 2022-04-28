class Watch {
    constructor() {
        /*
        * {
        *   key: watch键名,
        *   fn: watch回调
        * }
        *
        * */
        this.watchData = [];
    }

    initWatch(vm, watch) {
        for (let key in watch) {
            let fn = watch[key].bind(vm);
            this.addWatch({key, fn});
        }
    }

    addWatch(watchItem) {
        this.watchData.push(watchItem);
    }

    invoke(key, newValue, oldValue) {
        let watchItem = this.watchData.find(i => i.key === key);
        if (watchItem) {
            watchItem.fn(newValue, oldValue);
        }
    }
}

export default Watch;
