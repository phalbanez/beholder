const gridModel = require('../models/gridModel');

function insertGrids(grids, transaction) {
    return gridModel.bulkCreate(grids, {
        transaction
    });
}

function deleteGrids(automationId, transaction) {
    return gridModel.destroy({
        where: { automationId },
        transaction
    })
}

function getByAutomation(automationId) {
    return gridModel.findAll({ where: { automationId } });
}

async function updateGrid(id, newGrid) {
    const currentGrid = await gridModel.findByPk(id);
    if (newGrid.orderTemplateId !== currentGrid.orderTemplateId)
        currentGrid.orderTemplateId = newGrid.orderTemplateId;

    if (newGrid.conditions !== currentGrid.conditions)
        currentGrid.conditions = newGrid.conditions;

    await currentGrid.save();

    return gridModel.findByPk(id, { include: [{ all: true, nested: true }] });
}

module.exports = {
    insertGrids,
    deleteGrids,
    getByAutomation,
    updateGrid
}