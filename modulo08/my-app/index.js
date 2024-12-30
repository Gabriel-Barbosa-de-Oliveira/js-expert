//Para importar do diretorio utilizar o comando abaixo 
// node --experimental-specifier-resolution=node index.js

import FluentSQLBuilder from "@gabriel_barbosa/fluentsql";

import database from "./database/data.json" assert { type: "json" };

const result = FluentSQLBuilder.for(database)
    .where({ registered: /^(2020|2019)/ })
    .select(['name']).limit(3).build()

console.log({result})