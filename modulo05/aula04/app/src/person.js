const { evaluateRegex } = require("./util")

class Person {

    // (\w+):\s.*, - para separar nome de objeto e valor (nome: Gabriel,) - vai pegar só nome 
    //$1, - remove os valores mapeados

    constructor([nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado]) {

        // ^ -> começo da string 
        // + -> um ou mais ocorrencias
        // (\w{1}) -> pega só a primeira letra e dexa em um grupo 
        // (a-zA-Z) encontra letras maiusuculas ou minusculas, adicionamos o + para ele pegar todas ate o caracter especial
        // /g server para remover todas as ocorrencias que encontrar 

        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }

        //(\w+),
        //this.$1 = $1

        this.nome = nome
        this.nacionalidade = formatFirstLetter(nacionalidade)
        this.estadoCivil = formatFirstLetter(estadoCivil)
        //tudo que nao for digito vira vazio
        // /g server para remover todas as ocorrencias que encontrar 
        this.documento = documento.replace(evaluateRegex(/\D/g), "")
        //começa a procurar depois do " a " e pega tudo que tem a frente
        //(?<= faz com que ignore tudo que tiver antes desse match) 
        //conhecido como positive look behind
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.numero = numero
        //começa a buscar depois do espaço, pega qualquer letra ou digito ate o fim da linha(poderia ser o .* tbm)
        this.bairro = bairro.match(evaluateRegex(/(?<=\s)\w+$/)).join()
        //remove o ponto lieteral (.) do fim da frase
        this.estado = estado.replace(evaluateRegex(/\./), "")

    }
}

module.exports = Person