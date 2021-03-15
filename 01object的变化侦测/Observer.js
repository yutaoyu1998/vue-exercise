/*
    递归侦测所有的key

    将一个数据内的所有属性都转成getter／setter的形式
*/

export class Observer{
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

    Object.defineProperties(data, key, {
        enumerable: true,
        configuratable: true,
        get: function () {
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return
            val = newVal;
            dep.notify();
        }
    })
}