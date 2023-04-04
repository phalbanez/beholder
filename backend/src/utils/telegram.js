module.exports = (settings, message) => {

    if (!settings) throw new Error(`The settings object is required to send Telegram messages!`);
    if (!settings.telegramBot || !settings.telegramChat)
        throw new Error(`The Telegram settings are not defined!`);

    const { Telegraf } = require('telegraf');

    const bot = new Telegraf(settings.telegramBot);
    return bot.telegram.sendMessage(settings.telegramChat, message);
}