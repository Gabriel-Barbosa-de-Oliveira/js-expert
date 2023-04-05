const Product = require("../../entities/product");

class ProductDataBuilder {
    constructor() {
        //o default sao os dados corretos 
        //o caso de sucesso!
        this.productData = {
            id: "000001",
            name: "computer",
            price: 1000,
            category: "electronic"
        }
    }

    static aProduct() {
        return new ProductDataBuilder()
    }

    build() {
        const product = new Product(this.productData)
        return product
    }
}

module.exports = ProductDataBuilder