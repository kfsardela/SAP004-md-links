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
    return readDirectory(folder)

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

            if (options.validate) {

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
        .then(linksList => {
            if (options.stats) {
                const links = linksList.map(link => link.href)
                const unique = [...new Set(links)];
                let statistics = {
                    total: linksList.length,
                    unique: unique.length
                }
                if (options.validate) {
                    const broken = linksList.filter(link => !link.validate.includes('OK'))
                    statistics.broken = broken.length
                }
                return statistics
            }
            return linksList
        })
        .then(response => {

            if (options.stats) {
                let stats = [
                    `Total: ${response.total}`,
                    `Unique: ${response.unique}`
                ]
                if (options.validate) {
                    stats.push(`Broken: ${response.broken}`)
                }
                return stats.join("\n")
            }

            if (options.validate) {
                let validate = response.map(link => `${link.filePath} ${link.href} ${link.validate} ${link.text}`)

                return validate.join("\n")
            }

            let noOptions = response.map(link => `${link.filePath} ${link.href} ${link.text}`)

            return noOptions.join("\n")
        })


}


module.exports = mdLinks;