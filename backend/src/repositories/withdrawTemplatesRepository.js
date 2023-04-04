const withdrawTemplateModel = require('../models/withdrawTemplateModel');

function insertWithdrawTemplate(newWithdrawTemplate, transaction) {
    return withdrawTemplateModel.create(newWithdrawTemplate, { transaction });
}

function deleteWithdrawTemplate(id, transaction) {
    return withdrawTemplateModel.destroy({ where: { id }, transaction });
}

function deleteWithdrawTemplates(ids, transaction) {
    return withdrawTemplateModel.destroy({ where: { id: ids }, transaction });
}

function getWithdrawTemplate(id) {
    return withdrawTemplateModel.findOne({ where: { id } });
}

function getWithdrawTemplates(coin = '', page = 1) {
    const options = {
        where: {},
        order: [['coin', 'ASC'], ['name', 'ASC']],
        limit: 10,
        offset: 10 * (page - 1),
        distinct: true
    }

    if (coin) options.where = { coin };

    return withdrawTemplateModel.findAndCountAll(options);
}

async function updateWithdrawTemplate(id, newWithdrawTemplate) {

    const currentWithdrawTemplate = await getWithdrawTemplate(id);

    if (newWithdrawTemplate.name && newWithdrawTemplate.name !== currentWithdrawTemplate.name)
        currentWithdrawTemplate.name = newWithdrawTemplate.name;

    if (newWithdrawTemplate.amount && newWithdrawTemplate.amount !== currentWithdrawTemplate.amount)
        currentWithdrawTemplate.amount = newWithdrawTemplate.amount;

    if (newWithdrawTemplate.amountMultiplier && newWithdrawTemplate.amountMultiplier !== currentWithdrawTemplate.amountMultiplier)
        currentWithdrawTemplate.amountMultiplier = newWithdrawTemplate.amountMultiplier;

    if (newWithdrawTemplate.address && newWithdrawTemplate.address !== currentWithdrawTemplate.address)
        currentWithdrawTemplate.address = newWithdrawTemplate.address;

    if (newWithdrawTemplate.addressTag !== null && newWithdrawTemplate.addressTag !== undefined
        && newWithdrawTemplate.addressTag !== currentWithdrawTemplate.addressTag)
        currentWithdrawTemplate.addressTag = newWithdrawTemplate.addressTag;

    if (newWithdrawTemplate.network !== currentWithdrawTemplate.network)
        currentWithdrawTemplate.network = newWithdrawTemplate.network;

    await currentWithdrawTemplate.save();
    return currentWithdrawTemplate;
}

module.exports = {
    insertWithdrawTemplate,
    deleteWithdrawTemplate,
    deleteWithdrawTemplates,
    getWithdrawTemplate,
    getWithdrawTemplates,
    updateWithdrawTemplate
}