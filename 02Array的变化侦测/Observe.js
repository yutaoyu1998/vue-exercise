/*
    使用拦截器array覆盖Array.prototype
    
    避免污染全局，处理即将变成响应式的array
*/


/*
    es 6 之前， __proto__支持并不理想
    如果不能使用__proto__，就直接将arrayMethods身上的方法设置到被侦测的数组上

*/

const hasProto = '__proto__' in {};
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // 缓存原始方法
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            return original.apply(this, args);
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})

class Observer {
    constructor(value) {

        this.value = value;

        // dep
        this.dep = new Dep();   

        if (Array.isArray(value)) {

            // value.__proto__ = arrayMethods; // 新增

            const arguments = hasProto ? protoAugment : copyAugment;

            arguments(value, arrayMethods, arrayKeys);

        } else {

            this.walk(value)

        }
    }

    walk(obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i], obj[keys[i]]);
        }
    }
}

function protoAugment(target, src, keys) {
    target.__proto__ = src;
}

function copyAugment(target, src, keys) {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        def(target, key, src[key]);
    }
}
