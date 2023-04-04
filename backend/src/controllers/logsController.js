const fs = require('fs');
const path = require('path');

async function getLogs(req, res, next) {
    const file = req.params.file.replace(':', '');//fix para windows
    const filePath = path.resolve(__dirname, '..', '..', 'logs', file + '.log');
    if(!fs.existsSync(filePath)) return res.sendStatus(404);

    const content = fs.readFileSync(filePath);
    res.send(content);
}

module.exports = {
    getLogs
}