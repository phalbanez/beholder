const axios = require('axios');
const settingsRepository = require('../repositories/settingsRepository');

let cache = [];

function addToCache(data) {
    if (cache && cache.length)
        cache.push(data);
    else
        cache = [data];
}

function getFromCache() {
    const messages = [...cache];
    cache = [];
    return messages;
}

async function send(settings, body, title = 'Beholder Notification', data = {}) {
    if (typeof settings === 'number')
        settings = await settingsRepository.getSettings(settings);

    if (!settings || !settings.pushToken) return false;

    data.date = new Date();

    addToCache(data);

    const response = await axios.post('https://exp.host/--/api/v2/push/send', {
        to: settings.pushToken,
        title,
        body,
        data
    })

    if (response.data.errors || response.data.data.status === 'error') {
        settings.pushToken = null;
        await settings.save();

        throw new Error(`There was an error sending push notifications to ${settings.email}. The push token was cleaned!`);
    }
}

module.exports = {
    send,
    getFromCache
}