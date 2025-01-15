import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from "@jest/globals"
import Util from "../../src/util.js"

describe("#Util - String", () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test("#upperCaseFirstLetter should transform first letter to upper case", () => {
        const data = "hello"
        const expected = "Hello"
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test("#lowerFirstLetter should transform first letter to lower case", () => {
        const data = "Hello"
        const expected = "hello"
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test.todo("#lowerFirstLetter given an empty string should return an empty")
    test.todo("#upperCaseFirstLetter given an empty string should return an empty")

})