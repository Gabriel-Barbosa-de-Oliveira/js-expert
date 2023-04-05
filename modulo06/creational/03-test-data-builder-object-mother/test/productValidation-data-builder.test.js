const { expect } = require("chai")
const { it, describe } = require("mocha")

const { productValidator } = require("./../src") //por padrão o node procura pelo index.js 
const ProductDataBuilder = require("./model/productDataBuilder")

describe("Test Data Builder", () => {
    it("shouldn t return error with valid product", () => {
        const product = ProductDataBuilder.aProduct().build()
        const result = productValidator(product)

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected)
    })
})

describe("Product Validation Rules", () => {
    it("should return an object error when creating a Product with invalid Id")
    it("should return an object error when creating a Product with invalid name")
    it("should return an object error when creating a Product with invalid price")
    it("should return an object error when creating a Product with invalid category")
})