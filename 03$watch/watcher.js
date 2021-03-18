/*
    window.target ?
    依赖收集的是：通知用到数据的地方（模版中、用户写的watcher）

*/

class Watcher {
    constructor(vm, expOrFn, cb) {

        this.vm = vm;
        // expOrFn可以是一个函数
        if(typeof expOrFn === 'function'){
            this.getter = expOrFn;
        }else{
            this.getter = parsePath(expOrFn);
        }

        // this.getter() 读取解析路径后的值
        //this.getter = parsePath(expOrFn);
        this.cb = cb;
        this.value = this.get();
    }

    /*
        通过get取读取值，将自己添加到dep中
    */
    get() {
        window.target = this; //当前的watcher实例
        let value = this.getter.call(this.vm, this.vm);
        window.target = undefined;
        return value
    }

    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue); 
        // this.$watch('a.b.c', function(newVal, oldVal{ ... }
    }

    /*
        取消观察数据
        把watcher实例从当前正在观察的依赖列表中移除
    */
}


// 解析路径
const bailRE = /[^\w.$]/
function parsePath(path) {
    if (bailRE.test(path)) return
    const segments = path.split('.');
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]];
        }
        return obj;
    }
}