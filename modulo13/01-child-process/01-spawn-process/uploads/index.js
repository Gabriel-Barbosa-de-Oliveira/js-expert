import { spawn } from "child_process" //Serve para executar comandos do sistema operacional
const pythonFile = "index.py"
const pythonCommand = "python3"

async function requestPython({ url, headers, filePath }) {
    const py = spawn(pythonCommand, [ //comando que sera executado
        pythonFile, //nome do arquivo
        JSON.stringify({ url, headers, filePath }) //parametros
    ])
    const dataString = []
    for await(const data of py.stdout) {
        dataString.push(data.toString()) //.toString para converter Buffer para string
    }

    return dataString.join('')
}

const result = await requestPython({
    url: "http://localhost:3000",
    headers: { 'content-type': 'json'},
    filePath: './my-data.csv'
})

console.log('result', result)