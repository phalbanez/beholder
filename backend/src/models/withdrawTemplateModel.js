const Sequelize = require('sequelize');
const database = require('../db');

const WithdrawTemplateModel = database.define('withdrawTemplate', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amountMultiplier: Sequelize.DECIMAL(10,2),
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    addressTag: Sequelize.STRING,
    network: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        fields: ['name', 'coin'],
        unique: true
    }]
})

module.exports = WithdrawTemplateModel;