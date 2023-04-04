const Sequelize = require('sequelize');
const database = require('../db');

const settingsModel = database.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: Sequelize.STRING,
    pushToken: Sequelize.STRING,
    apiUrl: Sequelize.STRING,
    streamUrl: Sequelize.STRING,
    accessKey: Sequelize.STRING,
    secretKey: Sequelize.STRING,
    sendGridKey: Sequelize.STRING,
    twilioSid: Sequelize.STRING,
    twilioToken: Sequelize.STRING,
    twilioPhone: Sequelize.STRING,
    telegramBot: Sequelize.STRING,
    telegramChat: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        unique: true,
        fields: ['email']
    }]
})

module.exports = settingsModel