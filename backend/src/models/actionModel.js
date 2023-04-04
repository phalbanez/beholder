const Sequelize = require('sequelize');
const database = require('../db');
const OrderTemplateModel = require('./orderTemplateModel');
const WithdrawTemplateModel = require('./withdrawTemplateModel');

const ActionModel = database.define('action', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    automationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    orderTemplateId: Sequelize.INTEGER,
    withdrawTemplateId: Sequelize.INTEGER,
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

ActionModel.belongsTo(OrderTemplateModel, {
    foreignKey: 'orderTemplateId'
});

ActionModel.belongsTo(WithdrawTemplateModel, {
    foreignKey: 'withdrawTemplateId'
});

module.exports = ActionModel;