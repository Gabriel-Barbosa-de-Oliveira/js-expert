import { expect, describe, test, jest } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject.js";
import Payment from "../src/events/payment.js";
import Shipment from "../src/observers/shipment.js";
import Marketing from "../src/observers/marketing.js";

describe("Test Suit for Observer Patter", () => {
    beforeAll(() => {
        jest.spyOn(console, console.log.name).mockImplementation(() => { }) //Retira os logs dos testes
    })
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
    test("#All should notify subscribers after a credit card payment", () => {
        const subject = new PaymentSubject()
        const shipment = new Shipment()
        const marketing = new Marketing()

        const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingSpy = jest.spyOn(marketing, marketing.update.name)

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        const payment = new Payment(subject)

        const data = { userName: "gabrielbarbosa", id: Date.now() }
        payment.creditCard(data)

        expect(shipmentSpy).toBeCalledWith(data)
        expect(marketingSpy).toBeCalledWith(data)
    })
})