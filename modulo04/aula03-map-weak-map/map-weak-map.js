const assert = require("assert")

const myMap = new Map();

//podem ter qualquer coisa como chave 

myMap
    .set(1, "one")
    .set("Gabriel", { text: "two" })
    .set(true, () => "hello")


// usando um construtor 

const myMapWithConstructor = new Map([
    ["1", "str1"],
    [1, "num1"],
    [true, "bool1"]
])

//como usar 
assert.deepStrictEqual(myMap.get(1), "one")
assert.deepStrictEqual(myMap.get("Gabriel"), { text: "two" })
assert.deepStrictEqual(myMap.get(true)(), "hello")

//Em objects a chave só pode ser string ou symbol (number é coergido para string)

const onlyReferenceWorks = { id: 1 }

myMap.set(onlyReferenceWorks, { name: "GabrelBarbosa" })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "GabrelBarbosa" })

//utilitarios 

// - No Object seria Object.keys({a: 1}).length 
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto 
// item.key = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false 
// o jeito certo em object é ({ name: 'GabrielBarbosa' }).hasOwnProperty('name')

assert.ok(myMap.has(onlyReferenceWorks))

//para remover um item do objeto 
// delete item.id
// imperformatico para o JS 

assert.ok(myMap.delete(onlyReferenceWorks))

// Não da pra iterar em Objects diretamente 
//tem que transformar com Object.entries(item)

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Gabriel", { "text": "two" }], [true, () => { }]]))

for (const [key, value] of myMap) {
    console.log({ key, value })
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padra
// ({ }).toString() === '[Object Object]''
// ({toString: () => 'Hey'}).toString() === "Hey"

// Qualquer chave pode colidir, com as propriedades herdadas do object, como constructor, toString, valueOf e etc.

const actor = {
    name: "Xuxa da Silva",
    toString: "Queen: Xuxa da Silva"
}

//Não tem restrição de nome de chave 

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

//Nao da para limpar um Object sem reassina-lo

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

//Pode-se utilzar map no lugar do object em cenarios que 
//Adiciona ou remove mtas chaves 
//Verificar que a chave de forma semantica 
//Quando o objeto precisa funcionar como um banco de dados
//Casos que precise limpar a referencia apos o uso


// ---- WeakMap 

// Pode ser coletado após perder as referencias 
// Usado em casos beeem especificos - (Usado em stacktrace)

//tem a maioria dos beneficios do map 
// MAS: não é iteravel 
// só chaves de referencia e que voce ja conheça
//mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo 

const weakMap = new WeakMap()
const hero = { name: "Flash"}

//API de uso 

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)


 