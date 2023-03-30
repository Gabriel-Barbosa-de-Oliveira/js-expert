const assert = require("assert")


//usado na maioria das vezes para Listas de itens unicos 

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

//set é um objeto apesar de parecer um array. Usa padrão generator
//Array.from converte pra array
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

//Iterator com spread
assert.deepStrictEqual([...set], ["0", "1", "2", "3"]);

//ou então rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"]);

console.log("set.keys", set.keys())
console.log("set.values", set.values()) //Só existe por conta do map 

//no Array Comum, para saber se um item existe 
// [].indexOf("1") !== -1 pi [0].include(0)

assert.ok(set.has("3"))

//mesma teoria do map, mas voce sempre trabalha com a lista toda 
//nao tem get, então voce pode saber se o item esta ou não no array e é isso 
//na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em uma lista e não tem na outra e assim por diantes 

//tem nos dois arrays 

const users01 = new Set([
    "gabriel",
    "mariazinha",
    "xuxa da silva"
])

const users02 = new Set([
    "joaozinho",
    "gabriel",
    "julio"
])

const intersection = new Set([...users01].filter(user => users02.has(user)))

assert.deepStrictEqual(Array.from(intersection), ["gabriel"])

const difference = new Set([...users01].filter(user => !users02.has(user)))

assert.deepStrictEqual(Array.from(difference), ["mariazinha", "xuxa da silva"])

//Weakset 

//mesma ideia do WeakMap
//Não é enumeravel (iteravel)
//so trabalha com chaves como referencia 
//so tem metodos simples 

const user = { id: 123}
const user2 = { id: 321}

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)
