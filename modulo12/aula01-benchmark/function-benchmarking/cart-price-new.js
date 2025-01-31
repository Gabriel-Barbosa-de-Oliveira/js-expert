import Product from "../src/entities/product.js"

export default class Cart {
    constructor({ at, products }) {
        this.products = products
        this.total = this.getCartPrice()
    }

    getCartPrice() {
        let price = 0
        for(const product of this.products){
            price += product.price
        }

        return price
    }
}