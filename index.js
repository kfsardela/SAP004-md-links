const path = require("path")
const fs = require("fs")


const directoryPath = path.join(__dirname, "files")
fs.readdir(directoryPath, function(err, files) {
    if (err) {
        console.log("Error getting directory information.")
    } else {
        const filesMd = files.filter(function(file) {
            return path.extname(file) == ".md"
        })
        filesMd.forEach(function(file) {
            console.log(file)
            fs.readFile(directoryPath + "/" + file, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                } else {
                    const regex = data.match(/(\[.*\])(\(.*\))/gim);
                    regex.map((el) => {
                        const linkText = el.split('](');
                        const text = linkText[0].replace('[', '');
                        const href = linkText[1].replace(')', '');
                        return console.log({ file, text, href })

                    });
                }

            });
        })


    }
})