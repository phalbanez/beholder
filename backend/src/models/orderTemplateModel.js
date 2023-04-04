const Sequelize = require('sequelize');
const database = require('../db');

const OrderTemplateModel = database.define('orderTemplate', {
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
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    side: {
        type: Sequelize.STRING,
        allowNull: false
    },
    limitPrice: Sequelize.STRING,
    limitPriceMultiplier: Sequelize.DECIMAL(10,2),
    stopPrice: Sequelize.STRING,
    stopPriceMultiplier: Sequelize.DECIMAL(10,2),
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantityMultiplier: Sequelize.DECIMAL(10,2),
    icebergQty: Sequelize.STRING,
    icebergQtyMultiplier: Sequelize.DECIMAL(10,2),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        fields: ['symbol', 'name'],
        unique: true
    }]
})

module.exports = OrderTemplateModel;