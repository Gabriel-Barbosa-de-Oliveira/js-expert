import { expect, describe, test, jest } from "@jest/globals"
import BaseBusiness from "../src/business/base/baseBusiness.js"
import { NotImplementedException } from "../src/util/exceptions"

describe("#BaseBussiness", () => {
    test("should throw an error when child classe doesnt implemented _validateRequiredFields function", () => {
        class ConcreteClass extends BaseBusiness { }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        )

        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test("should throw an error when _validateRequiredFields returns false", () => {
        const VALIDATION_DOESNT_SUCCEEDED = false

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)
        }

        const concreteClass = new ConcreteClass()
        const validationError = new Error(`invalid data!`)

        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test("should throw an error when child classe doesnt implemented _create function", () => {
        const VALIDATION_SUCCEEDED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
        }

        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._create.name
        )

        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test.todo("should call _create and _validateRequiredFields on create")
})