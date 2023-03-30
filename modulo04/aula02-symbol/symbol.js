const assert = require("assert")

// --- keys 

const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = "value for normal Objects"
user[uniqueKey] = "value for Symbol"

//Objeto Normal 
console.log("getting normal Objects", user.userName)

//Não funciona
console.log("getting Symbol Objects - wrong", user[Symbol("userName")])

//utilizando symbol 
console.log("getting Symbol Objects", user[uniqueKey])

//Para funcionar precisa ser exportado para uma variavel 

assert.deepStrictEqual(user.userName, "value for normal Objects")

assert.deepStrictEqual(user[Symbol("userName")], undefined)

assert.deepStrictEqual(user[uniqueKey], "value for Symbol")

// geralmente usado para manter algo privado na classe 

// é dificil de pegar o dado mas não é secreto
console.log("symbols", Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má pratica (nem tem no codebase do node)
user[Symbol.for("password")] = 123
assert.deepStrictEqual(user[Symbol.for("password")], 123)

// --- keys

//Well known Symbols 
const obj = {
    //iterator - é o que o * faz por debaixo dos planos 
    [Symbol.iterator]: () => ({
        items: ["c", "b", "a"],
        next() {
            return {
                done: this.items.length === 0,
                //remove o ultimo e retorn 
                value: this.items.pop()
            }
        }
    })
}

// for (const item of obj) {
//     console.log("item", item)
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"])

const kItems = Symbol("kItems")

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") throw new TypeError()

        const itens = this[kItems].map(item => new Intl.DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric" }).format(item)
        )

        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(itens)
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems])
            yield item
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    //Substitui no [Object Object] - [object WHAT?]
    get [Symbol.toStringTag]() {
        return "WHAT?"
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02)
]

console.log("myDate", myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), "[object WHAT?]")

assert.throws(() => myDate + 1, TypeError)

//Conversão explicita
assert.deepStrictEqual(String(myDate), "01 de abril de 2020 e 02 de março de 2018")

//Implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

    // ; (async () => {
    //     for await (const item of myDate) {
    //         console.log("asyncIterator", item)
    //     }
    // })();

;(async () => {
    const dates =  await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()