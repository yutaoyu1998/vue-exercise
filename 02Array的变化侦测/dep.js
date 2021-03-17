/**
 * 管理依赖
 */
class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

    //  假设依赖是一个函数，定义在window.target上
    depend() {
        if (window.target) {
            this.addSub(window.target);
        }
    }

    // 通知依赖变化
    notify() {
        const subs = this.subs.slice();
        for (let i = 0; i < subs.length; i++) {
            subs[i].update();
        }
    }
}

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}