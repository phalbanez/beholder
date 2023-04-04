const automationsRepository = require('../repositories/automationsRepository');
const actionsRepository = require('../repositories/actionsRepository');
const gridsRepository = require('../repositories/gridsRepository');
const orderTemplatesRepository = require('../repositories/orderTemplatesRepository');
const ordersRepository = require('../repositories/ordersRepository');
const beholder = require('../beholder');
const agenda = require('../agenda');
const db = require('../db');
const logger = require('../utils/logger');

function validateConditions(conditions) {
    return /^(MEMORY\[\'.+?\'\](\..+)?[><=!]+([0-9\.\-]+|(\'.+?\')|true|false|MEMORY\[\'.+?\'\](\..+)?)( && )?)+$/ig.test(conditions);
}

async function startAutomation(req, res, next) {
    const id = req.params.id;
    const automation = await automationsRepository.getAutomation(id);
    if (automation.isActive) return res.sendStatus(204);

    automation.isActive = true;

    if (automation.schedule) {
        try {
            agenda.addSchedule(automation.get({ plain: true }));
        } catch (err) {
            return res.status(422).json(err.message);
        }
    }
    else
        beholder.updateBrain(automation.get({ plain: true }));

    await automation.save();

    if (automation.logs) logger('A:' + automation.id, `Automation ${automation.name} has started!`);

    res.json(automation);
}

async function stopAutomation(req, res, next) {
    const id = req.params.id;
    const automation = await automationsRepository.getAutomation(id);
    if (!automation.isActive) return res.sendStatus(204);

    if (automation.schedule)
        agenda.cancelSchedule(automation.id);
    else
        beholder.deleteBrain(automation.get({ plain: true }));

    automation.isActive = false;
    await automation.save();

    if (automation.logs) logger('A:' + automation.id, `Automation ${automation.name} has stopped!`);

    res.json(automation);
}

async function getAutomation(req, res, next) {
    const id = req.params.id;
    const automation = await automationsRepository.getAutomation(id);
    res.json(automation);
}

async function getAutomations(req, res, next) {
    const page = req.query.page;
    const result = await automationsRepository.getAutomations(page);
    res.json(result);
}

async function insertAutomation(req, res, next) {
    const newAutomation = req.body;
    const { quantity, levels } = req.query;

    if (!validateConditions(newAutomation.conditions) && !newAutomation.schedule)
        return res.status(400).json('You need to have at least one condition per automation!');

    if (!newAutomation.actions || newAutomation.actions.length < 1)
        return res.status(400).json('You need to have at least one action per automation!');

    const isGrid = newAutomation.actions[0].type === actionsRepository.actionTypes.GRID;
    if (isGrid) {
        if (!quantity || !levels)
            return res.status(400).json('Invalid grid params!');

        const exists = await automationsRepository.gridExists(newAutomation.name);
        if (exists) return res.status(409).json(`A grid for ${newAutomation.symbol} already exists!`);
    }
    else {
        const exists = await automationsRepository.automationExists(newAutomation.name);
        if (exists) return res.status(409).json(`The automation ${newAutomation.name} already exists!`);
    }

    const transaction = await db.transaction();
    let savedAutomation, actions = [], grids = [];

    try {
        savedAutomation = await automationsRepository.insertAutomation(newAutomation, transaction);

        //inserting actions
        actions = newAutomation.actions.map(a => {
            a.automationId = savedAutomation.id;
            delete a.id;
            return a;
        })
        actions = await actionsRepository.insertActions(actions, transaction);

        //inserting grids
        if (isGrid)
            grids = await beholder.generateGrids(savedAutomation, levels, quantity, transaction);

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        logger('system', err);
        return res.status(500).json(err.message);
    }

    savedAutomation = await automationsRepository.getAutomation(savedAutomation.id);

    if (savedAutomation.isActive) {
        if (savedAutomation.schedule) {
            try {
                agenda.addSchedule(savedAutomation.get({ plain: true }));
            } catch (err) {
                return res.status(422).json(err.message);
            }
        }
        else
            beholder.updateBrain(savedAutomation.get({ plain: true }));
    }

    res.status(201).json(savedAutomation);
}

async function updateAutomation(req, res, next) {
    const id = req.params.id;
    const newAutomation = req.body;

    const { quantity, levels } = req.query;

    if (!validateConditions(newAutomation.conditions) && !newAutomation.schedule)
        return res.status(400).json('You need to have at least one condition per automation!');

    if (!newAutomation.actions || !newAutomation.actions.length)
        return res.status(400).json('You need to have at least one action per automation!');

    const isGrid = newAutomation.actions[0].type === actionsRepository.actionTypes.GRID;
    if (isGrid && (!quantity || !levels))
        return res.status(400).json('Invalid grid params!');

    let actions = newAutomation.actions.map(a => {
        a.automationId = id;
        delete a.id;
        return a;
    })

    const transaction = await db.transaction();
    const currentAutomation = await automationsRepository.getAutomation(id);//uso mais tarde, no stop
    let updatedAutomation;

    try {
        updatedAutomation = await automationsRepository.updateAutomation(id, newAutomation);

        if (isGrid)
            await beholder.generateGrids(updatedAutomation, levels, quantity, transaction);
        else {
            await actionsRepository.deleteActions(id, transaction);
            actions = await actionsRepository.insertActions(actions, transaction);
        }

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        logger('system', err);
        return res.status(500).json(err.message);
    }

    updatedAutomation = await automationsRepository.getAutomation(id);//pega limpo

    if (updatedAutomation.isActive) {
        if (updatedAutomation.schedule) {
            try {
                agenda.cancelSchedule(updatedAutomation.id);
                agenda.addSchedule(updatedAutomation.get({ plain: true }));
            } catch (err) {
                return res.status(422).json(err.message);
            }
        } else {
            beholder.deleteBrain(currentAutomation);
            beholder.updateBrain(updatedAutomation.get({ plain: true }));
        }
    }
    else {
        if (updatedAutomation.schedule)
            agenda.cancelSchedule(updatedAutomation.id);
        else
            beholder.deleteBrain(currentAutomation);
    }

    res.json(updatedAutomation);
}

async function deleteAutomation(req, res, next) {
    const id = req.params.id;
    const currentAutomation = await automationsRepository.getAutomation(id);

    if (currentAutomation.isActive) {
        if (currentAutomation.schedule)
            agenda.cancelSchedule(currentAutomation.id);
        else
            beholder.deleteBrain(currentAutomation);
    }

    const transaction = await db.transaction();

    try {
        await ordersRepository.removeAutomationFromOrders(id, transaction);

        if (currentAutomation.actions[0].type === actionsRepository.actionTypes.GRID) {
            await gridsRepository.deleteGrids(id, transaction);
            await orderTemplatesRepository.deleteOrderTemplatesByGridName(currentAutomation.name, transaction);
        }

        await actionsRepository.deleteActions(id, transaction);
        await automationsRepository.deleteAutomation(id, transaction);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        logger('system', err);
        return res.status(500).json(err.message);
    }

    res.sendStatus(204);
}

module.exports = {
    startAutomation,
    stopAutomation,
    getAutomation,
    getAutomations,
    insertAutomation,
    updateAutomation,
    deleteAutomation
}
