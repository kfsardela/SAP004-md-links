#!/usr/bin/env node

const program = require('commander');
const mdLinks = require("./index.js");
const path = require('path')

program
    .option('-v, --validate', 'validade link')
    .option('-s, --stats', 'status link')
program.parse(process.argv);

mdLinks(path, program).then(response => console.log(response))

//     .action((path) => {
//         mdLinks(path, { validate: program.validate, stats: program.stats })
//             .then(links => {
//                     if (program.stats && program.validate) {
//                         const uniquer = links.map(link => link.href);
//                         const certo = [...new Set(uniquer)]
//                         const broken = links.filter(link => link.status === 'fail 404');
//                         console.log(`Total: ${links.length} Unique: ${certo.length} Broken: ${broken.length}`)

//                     } else if (program.stats) {
//                         const uniquer = links.map(link => link.href);
//                         const certo = [...new Set(uniquer)]
//                         console.log(`Total: ${links.length} Unique: ${certo.length} `)
//                     } else {
//                         links.forEach(link => {
//                             console.log(`${link.file} ${link.href} ${program.validate? link.status: ''} ${link.text}`)
//                         })
//                     }
//                 }


//             )
//             .catch(err => console.log(err))
//     })

// program.parse(process.argv);