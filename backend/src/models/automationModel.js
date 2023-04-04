const Sequelize = require('sequelize');
const database = require('../db');
const ActionModel = require('./actionModel');
const GridModel = require('./gridModel');

const AutomationModel = database.define('automation', {
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
    indexes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    conditions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    schedule: Sequelize.STRING,
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    logs: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        unique: true,
        fields: ['symbol', 'name']
    }]
})

AutomationModel.hasMany(ActionModel, {
    foreignKey: 'automationId'
});

AutomationModel.hasMany(GridModel, {
    foreignKey: 'automationId'
});

module.exports = AutomationModel;