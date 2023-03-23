class Fibonacci {
    * execute(input, current = 0, next = 1) { // Iterator Mode - gera por demanda
        //Processou todas as sequencias e para! 
        if (input === 0) {
            return
        }

        //Retorna o valor
        yield current

        //Delega a função mas não retorna valor
        yield * this.execute(input - 1, next, current + next)
    }
}

module.exports = Fibonacci;