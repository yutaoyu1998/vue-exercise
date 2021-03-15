import Dep from "./dep";

function defineReactive(data, key, val) {
    Object.defineProperties(data, key, {
        enumerable: true,
        configuratable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return
            val = newVal;
        }
    })
}

/*
    如何收集依赖；
    当数据发生改变时，通知用到该数据的地方。
    在getter中收集，在setter中触发

    借助dep类实现
*/

function defineReactive(data, key, val) {
    let dep = new Dep();

    Object.defineProperties(data, key, {
        enumerable: true,
        configuratable: true,
        get: function () {
            dep.depend(); //修改
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return
            val = newVal;
            dep.notify(); // 新增
        }
    })
}