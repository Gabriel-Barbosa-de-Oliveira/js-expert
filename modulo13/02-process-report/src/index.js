import { fork } from "child_process"
import { setTimeout } from "timers/promises";
const file = './data/All_Pokemon2.csv'
const PROCESS_COUNT = 10;

const backgroundTaskFile = "./src/backgroundTask.js"
const processes = new Map()
for (let index = 0; index < PROCESS_COUNT; index++) {
    const child = fork(backgroundTaskFile, [file])
    await setTimeout(200)
    child.send('hello world')
    processes.set(child.pid, child)
}