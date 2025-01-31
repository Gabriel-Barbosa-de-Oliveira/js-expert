import { createServer } from "http"


import Events from 'events'
import { randomBytes } from "crypto"
const myEvent = new Events()

function getBytes(){
    return randomBytes(1000)
}

function onData() {
    getBytes()
    const items = []
    setInterval(function myInterval() { items.push(Date.now()) })
}


myEvent.on('data', onData)
createServer(function handler(request, response) {

    myEvent.emit('data', Date.now())
    response.end('ok')
}).listen(3000, () => console.log("running at 3000"))