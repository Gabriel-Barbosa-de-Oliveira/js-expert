const http = require("http")

function handler(request,response) {
    const { url, method } = request
    return response.end("ok")
}

const app = http.createServer(handler).listen(3000, () => console.log("Running at 3000"))

