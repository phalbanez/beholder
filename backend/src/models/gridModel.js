const Sequelize = require('sequelize');
const database = require('../db');
const OrderTemplateModel = require('./orderTemplateModel');

const GridModel = database.define('grid',
    {
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
        conditions: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    })

GridModel.belongsTo(OrderTemplateModel, {
    foreignKey: 'orderTemplateId'
});

module.exports = GridModel;