const fs = require('fs');

module.exports.read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            if (err) return reject(err);
            return resolve(JSON.parse(data))
        })
    })
}

module.exports.write = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), { encoding: 'utf8' }, (err) => {
            if (err) return reject(err);
            return resolve();
        })
    })
}