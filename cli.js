#!/usr/bin/env node

const program = require('commander');
const mdLinks = require("./index.js");


program
    .arguments('[path]')
    .option('-v, --validate', 'validade link')
    .option('-s, --stats', 'status link')
    .action((path) => {
        path = path || "./"
        mdLinks(path, program).then(response => console.log(response))

    })
program.parse(process.argv);