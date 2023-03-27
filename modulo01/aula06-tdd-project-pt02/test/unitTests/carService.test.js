const { describe, it, before } = require("mocha");
const CarService = require("./../../src/service/carService");
const { join } = require("path");
const carsDatabase = join(__dirname, "./../../database", "cars.json")
const { expect } = require("chai");

const mocks = {
    validCarCategory: require("./../mocks/valid-carCategory.json"),
    validCar: require("./../mocks/valid-car.json"),
    validCustomer: require("./../mocks/valid-customer.json")
}
describe("CarService Suite Tests", () => {
    let carService = {};

    before(() => {
        carService = new CarService({
            cars: carsDatabase
        });
    })

    it("given a car category it should return an available car", async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory) //Object.create -> cria uma instancia imutavel do objeto (Como se fosse um cloneDeep)
        carCategory.ids = [car.id];

        const result = await carService.getAvailableCar(carCategory);
        const expected = car;

        expect(result).to.be.deep.equal(expected);
    })
})