const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const settingsRepository = require('../repositories/settingsRepository');

async function doLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const settings = await settingsRepository.getSettingsByEmail(email);
    if (settings) {
        const isValid = bcrypt.compareSync(password, settings.password);
        if (isValid) {
            const token = jwt.sign({
                id: settings.id
            },
                process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRES)
            })
            return res.json({ token, pushToken: settings.pushToken });
        }
    }

    res.status(401).send('401 Unauthorized');
}

const blacklist = [];

function doLogout(req, res, next) {
    const token = req.headers['authorization'];
    blacklist.push(token);
    return res.sendStatus(200);
}

function isBlacklisted(token) {
    return blacklist.some(t => t === token);
}

module.exports = {
    doLogin,
    doLogout,
    isBlacklisted
}