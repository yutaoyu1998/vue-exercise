function defineReactive(data, key, val){

    let childOb = observe(val); // 修改

    let dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            dep.depend();

            if(childOb){
                childOb.dep.depend();
            }
        },
        set: function(newVal){
            if(val === newVal){
                return
            }

            dep.notify();
            val = newVal;
        }
    })
}

/*
    尝试为value创建一个Observer实例，
    如果创建成功，直接返回新建的Observer实例
    如果value已经存在一个Observer实例，则直接返回它
 */
function observe(value, asRootData){
    if(!isObject(value)){
        return
    }
    let ob;
    if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer){
        ob = value.__ob__;
    }else{
        ob = new Observer(value);
    }
}

function isObject(value){

}