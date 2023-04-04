const monitorModel = require('../models/monitorModel');

const monitorTypes = {
    MINI_TICKER: 'MINI_TICKER',
    BOOK: 'BOOK',
    USER_DATA: 'USER_DATA',
    CANDLES: 'CANDLES',
    TICKER: 'TICKER'
}

async function monitorExists(type, symbol, interval) {
    const count = await monitorModel.count({ where: { type, symbol, interval } });
    return count > 0;
}

async function insertMonitor(newMonitor) {
    return monitorModel.create(newMonitor);
}

function deleteMonitor(id) {
    return monitorModel.destroy({
        where: { id, isSystemMon: false }
    })
}

async function updateMonitor(id, newMonitor) {
    const currentMonitor = await getMonitor(id);

    if (newMonitor.symbol && newMonitor.symbol !== currentMonitor.symbol)
        currentMonitor.symbol = newMonitor.symbol;

    if (newMonitor.type && newMonitor.type !== currentMonitor.type)
        currentMonitor.type = newMonitor.type;

    if (currentMonitor.type === monitorTypes.CANDLES) {
        if (newMonitor.interval && newMonitor.interval !== currentMonitor.interval)
            currentMonitor.interval = newMonitor.interval;
    }
    else
        currentMonitor.interval = null;

    if (newMonitor.broadcastLabel !== currentMonitor.broadcastLabel)
        currentMonitor.broadcastLabel = newMonitor.broadcastLabel;

    if (newMonitor.indexes !== currentMonitor.indexes)
        currentMonitor.indexes = newMonitor.indexes;

    if (newMonitor.isActive !== null && newMonitor.isActive !== undefined
        && newMonitor.isActive !== currentMonitor.isActive)
        currentMonitor.isActive = newMonitor.isActive;

    if (newMonitor.isSystemMon !== null && newMonitor.isSystemMon !== undefined
        && newMonitor.isSystemMon !== currentMonitor.isSystemMon)
        currentMonitor.isSystemMon = newMonitor.isSystemMon;

    if (newMonitor.logs !== null && newMonitor.logs !== undefined
        && newMonitor.logs !== currentMonitor.logs)
        currentMonitor.logs = newMonitor.logs;

    await currentMonitor.save();
    return currentMonitor;
}

function getMonitor(id) {
    return monitorModel.findByPk(id);
}

function getMonitors(page = 1) {
    return monitorModel.findAndCountAll({
        where: {},
        order: [['isActive', 'DESC'], ['isSystemMon', 'DESC'], ['symbol', 'ASC']],
        limit: 10,
        offset: 10 * (page - 1)
    });
}

function getActiveMonitors() {
    return monitorModel.findAll({ where: { isActive: true } });
}

module.exports = {
    getActiveMonitors,
    monitorTypes,
    monitorExists,
    insertMonitor,
    deleteMonitor,
    getMonitors,
    getMonitor,
    updateMonitor
}