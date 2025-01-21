import { Duplex } from 'stream';

let count = 0;
const server = new Duplex({
    objectMode: true, //Faz n precisar trabalhar com buffer => Gasta mais memoria
    encoding: "utf-8",
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Gabriel[${count}]`)
                return;
            }
            clearInterval(intervalContext)
            this.push(null)
        }
        setInterval(function () { everySecond(this) })
    },
    // é como se fosse um objeto completamente diferente
    write(chunk, encoding, cb) {
        console.log(`[Writable] saving`, chunk)
        cb()
    }
})

//Provar que são canais de comunicação diferentes
//write aciona o writable do duples
server.write('[Duplex] hey this is a writable !\n')
//on data => loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa voce enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`)


// server
// .pipe(process.stdout)