const data = {
    a: 0
}

//debugger

defineReactive(data, 'a', 0);

new Watcher(data, 'a', ()=>{
    console.log('cb watcher')
})

data.a ++;
data.a ++;
