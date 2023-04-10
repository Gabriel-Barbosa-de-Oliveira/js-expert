import { expect, describe, test, jest } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject.js";

describe("Test Suit for Observer Patter", () => {
    test("#PaymentSubject notify observers", () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }

        const data = "helo world"
        const expected = data
        subject.subscribe(observer)
        subject.notify(data)
        expect(observer.update).toBeCalledWith(expected)

    })
    test("#PaymentSubject should not notify unbscribed observers", () =>{
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = "helo world"
        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)
        expect(observer.update).not.toHaveBeenCalled()
    })
    test.todo("#PaymentSubject should notify subject after a credit card transaction observers")
    test.todo("#All should notify subscribers after a credit card payment")
})