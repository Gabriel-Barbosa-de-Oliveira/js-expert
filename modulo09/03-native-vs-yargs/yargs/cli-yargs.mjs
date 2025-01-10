#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })

const { argv } = yargs(hideBin(process.argv))
    .command('createHero', 'Create a hero', (builder) => {
        return builder
        .option('name', {
            alias: 'n',
            demandOption: true,
            describe: 'Hero name',
            type: 'string'
        }).option('age', {
            alias: 'a',
            demandOption: true,
            describe: 'Hero age',
            type: 'number'
        }).option('power', {
            alias: 'p',
            describe: 'Hero power',
            demandOption: true,
            type: 'string'
        })
        .example('createHero --name Flash --age 23 --power Speed', 'Create a hero')
        .example('createHero -n Flash -a 23 -p Speed', 'Create a hero')
    })
    .epilog('copyright 2024 - Gabriel Barbosa Corporation')



console.log(hero(argv))