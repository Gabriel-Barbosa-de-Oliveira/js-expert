import { createReadStream, write } from "fs";
import { pipeline } from "stream/promises";
import { setTimeout } from "timers/promises";
import csvToJson from "csvtojson"
import { Writable, Transform } from "stream";

const database = process.argv[2];

async function onMessage(msg) {
    const firsTimeRan = [];

    await pipeline(
        createReadStream(database),
        csvToJson(),
        Transform({
            transform(chunk, enc, cb) {
                const data = JSON.parse(chunk)
                if (data.Name !== msg.Name) return cb()
                if (firsTimeRan.includes(msg.Name)) {

                    return cb(null, msg.Name)
                }

                firsTimeRan.push(msg.Name)
                cb()
            }
        }),
        Writable({
            write(chunk, enc, cb) {
                if (!chunk) return cb()
                process.send(chunk.toString())
                cb()
            }
        })
    )
}

process.on('message', onMessage)

// console.log(`I'm ready!! ${process.pid}`, database)

// para falar que o sub processo pode morrer apos inatividade
await setTimeout(5000)
process.channel.unref()