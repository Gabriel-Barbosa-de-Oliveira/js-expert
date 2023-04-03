const Person = require("./person")
const { evaluateRegex } = require("./util")

//O objetivo do Fluent API é executar tarefas
//Como um pipeline, step ny step
//e no fim, chama o build. MUITO similar ao padrao Builder
//a diferença que aqui é sobre processos
//de objetos
class TextProcessorFluentAPI {

    // propriedade privada!
    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virão depois desse grupo 
        // [contratan|contratada] ou um ou outro, (e tem a flag no fim da expressão para pegar maiusculo e minusculo)
        // :\s{1} vai procurar o caracter literal do dois pontos seguido de um espaço
        // tudo acima fica dentro de um parenteses para falarmos pega dai pra frente 

        // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        // $ informar que acaba no fim da linha 
        // g -> global
        // m -> multiline 
        // i -> insensitive 

        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        //faz o match para encontrar a string inteira que contem os dados que precisamos e retorna como array
        const onlyPerson = this.#content.match(matchPerson)
        // console.log({onlyPerson})
        this.#content = onlyPerson

        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }

    mapPerson() {
        // passa o array de itens no construtor de pessoa
        this.#content = this.#content.map(line => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI