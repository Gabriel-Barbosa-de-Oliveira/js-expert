export default class Util {

    //gabrielbarbosa => [0] => g
    //first = g, rest = abrielbarbosa
    static #transform({ str: [first, ...rest], upperCase = true }) {
        if(!first) return ''
        const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase()
        return [firstLetter, ...rest].join('')
    }

    static upperCaseFirstLetter(str) {
        return Util.#transform({ str })
    }
    static lowerCaseFirstLetter(str) {
        return Util.#transform({ str, upperCase: false })

    }
}