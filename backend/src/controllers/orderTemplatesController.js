const orderTemplatesRepository = require('../repositories/orderTemplatesRepository');
const actionsRepository = require('../repositories/actionsRepository');
const { orderTypes } = require('../repositories/ordersRepository')

function validatePrice(price) {
    if (!price) return true;
    if (parseFloat(price)) return true;
    return /^(MEMORY\[\'.+?\'\](\..+)*)$/i.test(price);
}

async function getOrderTemplate(req, res, next) {
    const id = req.params.id;
    const orderTemplate = await orderTemplatesRepository.getOrderTemplate(id);
    res.json(orderTemplate);
}

async function getOrderTemplates(req, res, next) {
    const symbol = req.params.symbol;
    const page = req.query.page;
    const result = await orderTemplatesRepository.getOrderTemplates(symbol, page);
    res.json(result);
}

async function getAllOrderTemplates(req, res, next) {
    const symbol = req.params.symbol;
    const result = await orderTemplatesRepository.getAllOrderTemplates(symbol);
    res.json(result);
}

function calcTrailingStop(orderTemplate) {
    return orderTemplate.side === 'BUY' ? orderTemplate.limitPrice * (1 + (orderTemplate.stopPriceMultiplier / 100))
        : orderTemplate.limitPrice * (1 - (orderTemplate.stopPriceMultiplier / 100))
}

async function insertOrderTemplate(req, res, next) {
    const newOrderTemplate = req.body;

    if (newOrderTemplate.type === orderTypes.TRAILING_STOP)
        newOrderTemplate.stopPrice = calcTrailingStop(newOrderTemplate);

    if (!validatePrice(newOrderTemplate.limitPrice) || !validatePrice(newOrderTemplate.stopPrice))
        return res.status(400).json(`Invalid price.`);

    newOrderTemplate.quantity = newOrderTemplate.quantity ? newOrderTemplate.quantity.replace(',', '.') : newOrderTemplate.quantity;

    const orderTemplate = await orderTemplatesRepository.insertOrderTemplate(newOrderTemplate);
    res.status(201).json(orderTemplate);
}

async function updateOrderTemplate(req, res, next) {
    const id = req.params.id;
    const newOrderTemplate = req.body;
    newOrderTemplate.quantity = newOrderTemplate.quantity ? newOrderTemplate.quantity.replace(',', '.') : newOrderTemplate.quantity;

    if (newOrderTemplate.type === orderTypes.TRAILING_STOP)
        newOrderTemplate.stopPrice = calcTrailingStop(newOrderTemplate);

    const updatedOrderTemplate = await orderTemplatesRepository.updateOrderTemplate(id, newOrderTemplate);
    res.json(updatedOrderTemplate);
}

async function deleteOrderTemplate(req, res, next) {
    const id = req.params.id;

    const actions = await actionsRepository.getByOrderTemplate(id);
    if (actions.length > 0) return res.status(409).json(`You can't delete an Order Template used by Automations.`);

    await orderTemplatesRepository.deleteOrderTemplate(id);
    res.sendStatus(204);
}

module.exports = {
    getOrderTemplate,
    getOrderTemplates,
    insertOrderTemplate,
    updateOrderTemplate,
    deleteOrderTemplate,
    getAllOrderTemplates
}
