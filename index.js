const path = require("path")
const fs = require("fs")


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
                const regex = data.match(/(\[.*\])(\(.*\))/gim);
                const arrayRegex = regex.map((item) => {
                    const linkText = item.split('](');
                    const text = linkText[0].replace('[', '');
                    const href = linkText[1].replace(')', '');
                    return ({ filePath, text, href })

                });
                return resolved(arrayRegex);

            }
        })
    })
}



function mdLinks(folder) {
    const directoryPath = path.join(__dirname, "files")
    readDirectory(directoryPath)
        .then(filesPath => {

            const arrayLinks = filesPath.map(filePath => {
                return readFile(filePath)
            })
            Promise.all(arrayLinks)
                .then(arrayLinks => {
                    console.log(arrayLinks)
                })
        })

    .catch(error => console.log("Promises rejected: " + error));


}
mdLinks();


module.exports = mdLinks;