const Sequelize = require('sequelize');
const database = require('../db');
const AutomationModel = require('./automationModel');

const OrderModel = database.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    automationId: Sequelize.INTEGER,
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderId: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    clientOrderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transactTime: {
        type: Sequelize.BIGINT,
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
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isMaker: Sequelize.BOOLEAN,
    limitPrice: Sequelize.STRING,
    stopPrice: Sequelize.STRING,
    avgPrice: Sequelize.DECIMAL(18, 8),
    commission: Sequelize.STRING,
    net: Sequelize.DECIMAL(18, 8),
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icebergQty: Sequelize.STRING,
    obs: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        unique: true,
        fields: ['clientOrderId', 'orderId']
    }, {
        fields: ['symbol']
    }]
})

OrderModel.belongsTo(AutomationModel, {
    foreignKey: 'automationId'
})

module.exports = OrderModel;