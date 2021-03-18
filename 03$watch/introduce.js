/*

    vm.$watch(expOrFn, callback, [options])

    用于观察一个表达式或computed函数在Vue.js实例上的变化。
    表达式只接受点分割的路径，如果是一个比较复杂的表达式，可以用函数代替表达式。
*/

Vue.prototype.$watch = function(expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm, expOrFn, cb, options);
    if(options.watcher){
        cb.call(vm, watcher.value)
    }
    return function unWatchFn(){
        watcher.teardown();
    }
}