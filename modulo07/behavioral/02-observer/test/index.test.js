import { expect, describe, test, jest } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject.js";
import Payment from "../src/events/payment.js";

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
    test("#PaymentSubject should not notify unbscribed observers", () => {
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
    test("#PaymentSubject should notify subject after a credit card transaction observers", () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifierSpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name
        )

        const data = { userName: "gabrielbarbosa", id: Date.now() }
        payment.creditCard(data)

        expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)

    })
    test.todo("#All should notify subscribers after a credit card payment")
})