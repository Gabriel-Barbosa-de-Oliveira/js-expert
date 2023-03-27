const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("./../../src/service/carService");
const { join } = require("path");
const carsDatabase = join(__dirname, "./../../database", "cars.json")
const { expect } = require("chai");
const sinon = require("sinon")
const { sandbox } = require("sinon")

const mocks = {
    validCarCategory: require("./../mocks/valid-carCategory.json"),
    validCar: require("./../mocks/valid-car.json"),
    validCustomer: require("./../mocks/valid-customer.json")
}
describe("CarService Suite Tests", () => {
    let carService = {};
    let sandbox = {}
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        });
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it("should retrieve a random position from an array", () => {
        const data = [0,1,2,3,4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it("should choose the first id from carIds in carCategory", () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0
        
        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        console.log({carCategory})
        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIdIndex]
        expect(result).to.be.equal(expected)
    })


    // it("given a car category it should return an available car", async () => {
    //     const car = mocks.validCar
    //     const carCategory = Object.create(mocks.validCarCategory) //Object.create -> cria uma instancia imutavel do objeto (Como se fosse um cloneDeep)
    //     carCategory.ids = [car.id];

    //     const result = await carService.getAvailableCar(carCategory);
    //     const expected = car;

    //     expect(result).to.be.deep.equal(expected);
    // })
})