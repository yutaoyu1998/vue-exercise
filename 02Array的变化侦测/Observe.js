/*
    使用拦截器array覆盖Array.prototype
    
    避免污染全局，处理即将变成响应式的array
*/


/*
    es 6 之前， __proto__支持并不理想
    如果不能使用__proto__，就直接将arrayMethods身上的方法设置到被侦测的数组上

    侦测新增元素的变化,对数组中方法进行判断


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
            const result = original.apply(this, args);
            // 通过this.__ob__来访问Observer实例
            const ob = this.__ob__;

            // 将新增的元素暂存inserted
            let inserted
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }

            //转化新增元素
            if(inserted) ob.observeArray(inserted);

            // 向依赖发送消息
            ob.dep.notify();

            return result;
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

        // 为value上新增一个不可枚举的属性__ob__
        def(value, '__ob__', this)

        // if (Array.isArray(value)) {
        //     // value.__proto__ = arrayMethods; // 新增
        //     const arguments = hasProto ? protoAugment : copyAugment;
        //     arguments(value, arrayMethods, arrayKeys);
        // } else {
        //     this.walk(value)
        // }

        /*
            当数组中object身上某个值也需要变化是，也需要发送通知
            所有响应式的子数据都要侦测，不论是object中的数据还是Array中的数据
         */

        if (Array.isArray(value)) {
            this.observeArray(value);
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

    /**
     * 侦测Array中的每一项
     */

    observeArray(items) {
        for (let i = 0, l = item.length; i < l; i++) {
            observe(items[i])
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

/*
    工具函数, 新增一个不可枚举的属性
*/
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}