const orderTemplateModel = require('../models/orderTemplateModel');
const Sequelize = require('sequelize');

function insertOrderTemplate(newOrderTemplate, transaction) {
    return orderTemplateModel.create(newOrderTemplate, { transaction });
}

function deleteOrderTemplate(id) {
    return orderTemplateModel.destroy({ where: { id } });
}

function getOrderTemplates(symbol, page = 1) {
    const options = {
        where: {},
        order: [['symbol', 'ASC'], ['name', 'ASC']],
        limit: 10,
        offset: 10 * (page - 1),
        distinct: true
    };

    if (symbol) {
        if (symbol.length < 6)
            options.where = { symbol: { [Sequelize.Op.like]: `%${symbol}%` } }
        else
            options.where = { symbol }
    }

    return orderTemplateModel.findAndCountAll(options);
}

function getAllOrderTemplates(symbol) {
    const options = {
        where: { symbol }
    };

    if (symbol.startsWith('*')) {
        options.where.symbol = { [Sequelize.Op.like]: `%${symbol.replace('*', '')}` };
    }

    return orderTemplateModel.findAll(options);
}

async function getOrderTemplate(id) {
    return orderTemplateModel.findOne({ where: { id } });
}

async function updateOrderTemplate(id, newOrderTemplate) {

    const currentOrderTemplate = await getOrderTemplate(id);

    if (newOrderTemplate.name && newOrderTemplate.name !== currentOrderTemplate.name)
        currentOrderTemplate.name = newOrderTemplate.name;

    if (newOrderTemplate.type && newOrderTemplate.type !== currentOrderTemplate.type)
        currentOrderTemplate.type = newOrderTemplate.type;

    if (newOrderTemplate.side && newOrderTemplate.side !== currentOrderTemplate.side)
        currentOrderTemplate.side = newOrderTemplate.side;

    if (newOrderTemplate.limitPrice && newOrderTemplate.limitPrice !== currentOrderTemplate.limitPrice)
        currentOrderTemplate.limitPrice = newOrderTemplate.limitPrice;

    if (newOrderTemplate.limitPriceMultiplier && newOrderTemplate.limitPriceMultiplier !== currentOrderTemplate.limitPriceMultiplier)
        currentOrderTemplate.limitPriceMultiplier = newOrderTemplate.limitPriceMultiplier;

    if (newOrderTemplate.stopPrice && newOrderTemplate.stopPrice !== currentOrderTemplate.stopPrice)
        currentOrderTemplate.stopPrice = newOrderTemplate.stopPrice;

    if (newOrderTemplate.stopPriceMultiplier && newOrderTemplate.stopPriceMultiplier !== currentOrderTemplate.stopPriceMultiplier)
        currentOrderTemplate.stopPriceMultiplier = newOrderTemplate.stopPriceMultiplier;

    if (newOrderTemplate.quantity && newOrderTemplate.quantity !== currentOrderTemplate.quantity)
        currentOrderTemplate.quantity = newOrderTemplate.quantity;

    if (newOrderTemplate.quantityMultiplier && newOrderTemplate.quantityMultiplier !== currentOrderTemplate.quantityMultiplier)
        currentOrderTemplate.quantityMultiplier = newOrderTemplate.quantityMultiplier;

    await currentOrderTemplate.save();
    return currentOrderTemplate;
}

function deleteOrderTemplatesByGridName(gridName, transaction) {
    const likeName = gridName.split('#')[0];
    return orderTemplateModel.destroy({
        where: { name: { [Sequelize.Op.like]: `${likeName}#%` } },
        transaction
    })
}


function getOrderTemplatesByGridName(gridName) {
    const likeName = gridName.split('#')[0];
    return orderTemplateModel.findAll({
        where: { name: { [Sequelize.Op.like]: `${likeName}#%` } }
    })
}

module.exports = {
    getOrderTemplate,
    getOrderTemplates,
    insertOrderTemplate,
    updateOrderTemplate,
    deleteOrderTemplate,
    deleteOrderTemplatesByGridName,
    getOrderTemplatesByGridName,
    getAllOrderTemplates
}