const appEm = require('../app-em');
const monitorsRepository = require('../repositories/monitorsRepository');
const { monitorTypes } = require('../repositories/monitorsRepository');

function startStreamMonitor(monitor) {
    switch (monitor.type) {
        case monitorTypes.CANDLES: {
            appEm.startChartMonitor(monitor.id, monitor.symbol, monitor.interval, monitor.indexes ? monitor.indexes.split(',') : [], monitor.broadcastLabel, monitor.logs);
            break;
        }
        case monitorTypes.TICKER: {
            appEm.startTickerMonitor(monitor.id, monitor.symbol, monitor.broadcastLabel, monitor.logs);
            break;
        }
    }
}

function stopStreamMonitor(monitor) {
    switch (monitor.type) {
        case monitorTypes.CANDLES: {
            appEm.stopChartMonitor(monitor.id, monitor.symbol, monitor.interval, monitor.indexes ? monitor.indexes.split(',') : [], monitor.logs);
            break;
        }
        case monitorTypes.TICKER: {
            appEm.stopTickerMonitor(monitor.id, monitor.symbol, monitor.logs);
            break;
        }
    }
}

async function startMonitor(req, res, next) {
    const id = req.params.id;
    const monitor = await monitorsRepository.getMonitor(id);
    if (monitor.isActive) return res.sendStatus(204);
    if (monitor.isSystemMon) return res.status(404).send(`You can't start or stop the system monitors.`);

    startStreamMonitor(monitor);

    monitor.isActive = true;
    await monitor.save();

    res.json(monitor);
}

async function stopMonitor(req, res, next) {
    const id = req.params.id;
    const monitor = await monitorsRepository.getMonitor(id);
    if (!monitor.isActive) return res.sendStatus(204);
    if (monitor.isSystemMon) return res.status(404).send(`You can't start or stop the system monitors.`);

    stopStreamMonitor(monitor);

    monitor.isActive = false;
    await monitor.save();

    res.json(monitor);
}

async function getMonitor(req, res, next) {
    const id = req.params.id;
    const monitor = await monitorsRepository.getMonitor(id);
    res.json(monitor);
}

async function getMonitors(req, res, next) {
    const page = req.query.page;
    const result = await monitorsRepository.getMonitors(page);
    res.json(result);
}

function validateMonitor(newMonitor) {
    if (newMonitor.type !== monitorTypes.CANDLES) {
        newMonitor.interval = null;
        newMonitor.indexes = null;

        if (newMonitor.type !== monitorTypes.TICKER)
            newMonitor.symbol = '*';
    }

    if (newMonitor.broadcastLabel === 'none')
        newMonitor.broadcastLabel = null;

    return newMonitor;
}

async function insertMonitor(req, res, next) {
    const newMonitor = validateMonitor(req.body);

    const alreadyExists = await monitorsRepository.monitorExists(newMonitor.type, newMonitor.symbol, newMonitor.interval);
    if (alreadyExists) res.status(409).send(`Already exists a monitor with these params.`);

    const monitor = await monitorsRepository.insertMonitor(newMonitor);

    if (monitor.isActive) {
        startStreamMonitor(monitor);
    }

    res.status(201).json(monitor.get({ plain: true }));
}

async function updateMonitor(req, res, next) {
    const id = req.params.id;
    const newMonitor = validateMonitor(req.body);

    const currentMonitor = await monitorsRepository.getMonitor(id);
    if (currentMonitor.isSystemMon) return res.sendStatus(403);

    const updatedMonitor = await monitorsRepository.updateMonitor(id, newMonitor);
    stopStreamMonitor(currentMonitor);

    if (updatedMonitor.isActive)
        startStreamMonitor(updatedMonitor);

    res.json(updatedMonitor);
}

async function deleteMonitor(req, res, next) {
    const id = req.params.id;
    const currentMonitor = await monitorsRepository.getMonitor(id);
    if (currentMonitor.isSystemMon) return res.sendStatus(403);

    if (currentMonitor.isActive) stopStreamMonitor(currentMonitor);

    await monitorsRepository.deleteMonitor(id);

    res.sendStatus(204);
}

module.exports = {
    startMonitor,
    stopMonitor,
    getMonitor,
    getMonitors,
    insertMonitor,
    updateMonitor,
    deleteMonitor
}
