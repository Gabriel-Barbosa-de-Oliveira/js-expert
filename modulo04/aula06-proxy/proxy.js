"use strict"

const Event = require("events")
const event = new Event()
const eventName = "counter";

event.on(eventName, msg => console.log("counter updated", msg))

const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    set: (target, propertyKey, newValue) => {
        event.emit(eventName, { newValue, key: target[propertyKey] })
        target[propertyKey] = newValue
        return true
    },
    get: (object, prop) => {
        // console.log("chamou", { object, prop })
        return object[prop]
    }
})

//intervalo
setInterval(function () {
    proxy.counter += 1
    if (proxy.counter === 10) clearInterval(this)
}, 200)

//futuro
//Chamar o timeout com valor 0 é ma pratica 
setTimeout(() => {
    proxy.counter = 4
    console.log("Set timeout")
}, 100)

//imediado
//Se eu quero que executar agora 
setImmediate(() => {
    console.log("[1]: setImmediate", proxy.counter)
})


//mais que imediato
// executa agora, agorinha, mas acaba com o ciclo de vida do node 
// considerado ma pratica
process.nextTick(() => {
    proxy.counter = 2
    console.log("[0]: Next Tick")
})