const actionModel = require('../models/actionModel');

const actionTypes = {
    ALERT_EMAIL: 'ALERT_EMAIL',
    ALERT_SMS: 'ALERT_SMS',
    ALERT_TELEGRAM: 'ALERT_TELEGRAM',
    ORDER: 'ORDER',
    GRID: 'GRID',
    WITHDRAW: 'WITHDRAW',
    TRAILING: 'TRAILING'
}

function insertActions(actions, transaction) {
    return actionModel.bulkCreate(actions, {
        transaction
    });
}

function deleteActions(automationId, transaction) {
    return actionModel.destroy({
        where: { automationId },
        transaction
    })
}

function getByOrderTemplate(orderTemplateId) {
    return actionModel.findAll({ where: { orderTemplateId } });
}

function getByWithdrawTemplate(withdrawTemplateId) {
    return actionModel.findAll({ where: { withdrawTemplateId } });
}

module.exports = {
    insertActions,
    deleteActions,
    getByOrderTemplate,
    getByWithdrawTemplate,
    actionTypes
}