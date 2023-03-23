const { createSandbox } = require("sinon"); // Boa pratica criar um sandbox
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();
const assert = require("assert");

const fibonacci = new Fibonacci();

; (async () => {
    {
        //Numero de sequencias: 5
        // [0] input = 5, current = 0, next = 1 = resultao = 0
        // [1] input = 4, current = 1, next = 1 = resultao = 1
        // [2] input = 3, current = 1, next = 2 = resultao = 1
        // [3] input = 2, current = 2, next = 3 = resultao = 2
        // [4] input = 1, current = 3, next = 5 = resultao = 3
        // [5] input = 0 -> PARA

        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        for (const sequencia of fibonacci.execute(5)) {
        }
        
        const expepectedCallCount = 6;
        assert.strictEqual(spy.callCount, expepectedCallCount)
    }
})()