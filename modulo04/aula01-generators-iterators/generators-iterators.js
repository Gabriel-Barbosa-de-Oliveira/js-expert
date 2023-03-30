const assert = require("assert")

function* calculation(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield "Hello"
    yield "-"
    yield "World"
    yield* calculation(20, 10)
}

//functio* significa que a função não deve ser executada em um primeiro momento e executar somente quando for chamada
//yield* significa que a função tem que ser executada nesse momento 

const generator = main()

//iterações que vão retornando os valores do yield
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false })
assert.deepStrictEqual(generator.next(), { value: "-", done: false })
assert.deepStrictEqual(generator.next(), { value: "World", done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

//Retorna tudo de uma vez através do generator
console.log("Array.from", Array.from(main()))

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200])

//Faz a mesma coisa que o Array.from utilizando o spread
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])


//async iterators 

const { readFile, stat, readdir } = require("fs/promises")

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve("Hey Dude")
}

// Formas de chamar com promises 

// Promise.all([...promisified()]).then(results => console.log("Promisified", results))

// ;(async () => {
//     for await (const item of promisified()){
//         console.log("for await", item)
//     }
// })()

async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }

    const dir = await readdir(__dirname)
    yield { dir }
}

; (async () => {
    for await (const item of systemInfo()) {
        console.log("SystemInfo", item)
    }
})()

