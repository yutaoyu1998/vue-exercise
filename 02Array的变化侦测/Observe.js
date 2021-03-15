/*
    使用拦截器array覆盖Array.prototype
    
    避免污染全局，处理即将变成响应式的array
*/

class Observer{
    constructor(value){

        this.value = value;

        if(!Array.isArray(value)){
            this.walk(value)
        }else{
            value.__proto__ = arrayMethods; // 新增
        }
    }

    walk(obj){
        const keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            defineReactive(data, keys[i], obj[keys[i]]);
        }
    }
}