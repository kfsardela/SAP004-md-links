const path = require("path")
const fs = require("fs")
const fetch = require('node-fetch');


const readDirectory = (folder) => {
    return new Promise((resolved, rejected) => {
        fs.readdir(folder, function(err, files) {
            if (err) {
                return rejected(err.message);
            } else {
                const filesMd = files.filter(function(file) {
                    return path.extname(file) == ".md"
                })

                const filesPath = filesMd.map(function(file) {
                    return path.join(folder, file)
                })

                return resolved(filesPath);

            }
        })
    })
}

const readFile = (filePath) => {
    return new Promise((resolved, rejected) => {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                return rejected(err.message);
            } else {
                const regex = data.match(/\[(.[^\]]*)\]\((http.*)\)/gm);
                const arrayRegex = regex.map((item) => {
                    const linkText = item.split('](');
                    const text = linkText[0].replace('[', '');
                    const href = linkText[1].replace(')', '');
                    // console.log(status)
                    const linkObject = { filePath, text, href }
                    return linkObject

                });
                return resolved(arrayRegex);

            }
        })
    })
}


const validateURL = (link) => {
    return fetch(link)
        .then(response => `${response.statusText} ${response.status}`)
        .catch(error => `fail`)
}


function mdLinks(folder, options) {
    console.log(options)
    const directoryPath = path.join(__dirname, "files")
    readDirectory(directoryPath)
        .then(filesPath => {
            return filesPath.map(filePath => {
                return readFile(filePath)
            })
        })
        .then(arrayLinks => {
            return Promise.all(arrayLinks)
                .then(arrayLinks => {
                    const linksList = arrayLinks.reduce((acumulator, currentValue) => {
                        return acumulator.concat(currentValue)
                    }, [])

                    return linksList
                })
        })
        .then(linksList => {

            if (options === "--validate") {

                const promiseLinks = linksList.map(link => {
                    return validateURL(link.href)
                })
                return Promise.all(promiseLinks).then(resolvedLinks => {
                    return linksList.map((link, index) => {
                        link.validate = resolvedLinks[index]
                        return link
                    })
                })
            }
            return linksList
        })
        .then(teste => {
            // console.log(teste)
        })


    // .catch(error => console.log("Promises rejected: " + error));


}



mdLinks();


module.exports = mdLinks;