const { getAutomations } = require('../repositories/automationsRepository');
const beholder = require('../beholder');
const agenda = require('../agenda');
const indexes = require('../utils/indexes');

function getAgenda(req, res, next) {
    res.json(agenda.getAgenda());
}

function getMemory(req, res, next) {
    const { symbol, index, interval } = req.params;
    res.json(beholder.getMemory(symbol, index, interval));
}

function getMemoryIndexes(req, res, next) {
    res.json(beholder.getMemoryIndexes());
}

function getBrainIndexes(req, res, next) {
    res.json(beholder.getBrainIndexes());
}

function getBrain(req, res, next) {
    res.json(beholder.getBrain());
}

function getAnalysisIndexes(req, res, next) {
    res.json(indexes.getAnalysisIndexes());
}

async function init(req, res, next) {
    const automations = await getAutomations();
    beholder.init(automations);
    res.json(beholder.getBrain());
}

module.exports = {
    getMemory,
    getMemoryIndexes,
    getBrain,
    getBrainIndexes,
    getAnalysisIndexes,
    getAgenda,
    init
}