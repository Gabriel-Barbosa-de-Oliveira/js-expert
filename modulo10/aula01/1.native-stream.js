//Process é um objeto global do Node.js
//Stdin é a entrada padrão do processo
//Stdout é a saída padrão do processo
//ls | grep package | xargs cat | jq .name
// process.stdin.pipe(process.stdout)
// .on("data", msg => console.log('data', msg.toString()))
// .on("error", msg => console.log('error', msg.toString()))
// .on("end", _ => console.log('end'))
// .on("close", _ => console.log('close'))

//terminal 1
//node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//terminal 2
//node -e "process.stdin.pipe(require('net').connect(1338))""