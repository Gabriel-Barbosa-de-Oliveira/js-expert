const { describe, it, after, before } = require("mocha")
const supertest = require("supertest");
const assert = require("assert");

describe("Api Suite Test", () => {
    let app

    // Inicializa a aplicação antes de cada teste
    before((done) => {
        app = require("./api");
        app.once("listening", done)
    })

    //Finaliza a aplicação depois de cada teste
    after(done => app.close(done))

    describe('/contact:get', () => {
        it("should request the contact route and return HTTP Status 200", async () => {
            const response = await supertest(app).get("/contact").expect(200)
            assert.strictEqual(response.text, "contact us page")


        })
    })

    describe('/login:post', () => {
        it("should request the login and return HTTP Status 200", async () => {
            const response = await supertest(app).post("/login")
                .send({ "username": "GabrielBarbosa", "password": "123" })
                .expect(200)
            assert.strictEqual(response.text, "Log in success!")
        })
    })

    describe('/login:post', () => {
        it("should request the login and return HTTP Status 401", async () => {
            const response = await supertest(app).post("/login")
                .send({ "username": "GabrielBarbosa", "password": "1234" })
                .expect(401)
            assert.strictEqual(response.text, "Log in failed!")
        })
    })
})