import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from './../src/person.js'

describe("Person", () => {
    it("should return a person instance from a string", () => {
        const person = Person.generateInstanceFromString(
            "3 Onibus,Bike 3000 2020-01-01 2022-01-01"
        )

        const expected = {
            from: "2020-01-01",
            to: "2022-01-01",
            vehicles: ["Onibus", "Bike"],
            kmTraveled: "3000",
            id: "3"
        }

        expect(person).to.be.deep.equal(expected)
    })

    it("should format values", () => {
        const person = Person.generateInstanceFromString(
            "3 Onibus,Bike 3000 2020-01-01 2022-01-01"
        )

        const result = person.formatted("pt-BR")
        const expected = {
            id: 3,
            vehicles: 'Onibus e Bike',
            kmTraveled: '3.000 km',
            from: '01 de janeiro de 2020',
            to: '01 de janeiro de 2022'
        }

        expect(result).to.be.deep.equal(expected)
    })
})

