/*
    递归侦测所有的key

    将一个数据内的所有属性都转成getter／setter的形式
*/

class Observer{
    constructor(value){

        this.value = value;

        if(!Array.isArray(value)){
            this.walk(value)
        }
    }

    walk(obj){
        const keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            defineReactive(data, keys[i], obj[keys[i]]);
        }
    }
}

function defineReactive(data, key, val) {

    if(typeof val === 'object') {
        new Observer(val);
    }

    let dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('收集依赖', data, key);
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return
            val = newVal;
            console.log('触发依赖', data, key);
            dep.notify();
        }
    })
}