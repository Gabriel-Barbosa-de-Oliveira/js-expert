
$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl -s "http://localhost:8080"`
console.log(`req\n`, req.stdout)

const containers = await $`docker ps`

//unsafe!
//const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x+)+y/

const exp = /(?<containerId>\w+)\W+(?=nginx)/
if (!isSafe(exp)) throw new Error('UnSafe Regex')

const {groups: {containerId}} = (containers.toString().match(exp))
console.log(containerId)

const logs = await $`docker logs ${containerId}`
console.log('logs\n', logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log('rm -f\n', rm.stdout)
