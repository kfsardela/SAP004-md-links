// const fs = require('fs')

// const mdLinks = (path) => {


// };

// module.exports = mdLinks;

fs = require('fs')
fs.readFile('README.md', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});