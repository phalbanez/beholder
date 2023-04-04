const symbolModel = require('../models/symbolModel');
const Sequelize = require('sequelize');

function getManySymbols(symbols) {
    return symbolModel.findAll({
        where: { symbol: symbols }
    })
}

function getSymbols() {
    return symbolModel.findAll();
}

function searchSymbols(search, onlyFavorites = false, page = 1) {
    const options = {
        where: {},
        order: [['symbol', 'ASC']],
        limit: 10,
        offset: 10 * (page - 1)
    };

    if (search) {
        if (search.length < 6)
            options.where = { symbol: { [Sequelize.Op.like]: `%${search.toUpperCase()}%` } }
        else
            options.where = { symbol: search }
    }

    if (onlyFavorites) options.where.isFavorite = true;

    return symbolModel.findAndCountAll(options);
}

function getSymbol(symbol) {
    return symbolModel.findOne({ where: { symbol } });
}

async function updateSymbol(symbol, newSymbol) {
    const currentSymbol = await getSymbol(symbol);

    if (newSymbol.minNotional && newSymbol.minNotional !== currentSymbol.minNotional)
        currentSymbol.minNotional = newSymbol.minNotional;

    if (newSymbol.minLotSize && newSymbol.minLotSize !== currentSymbol.minLotSize)
        currentSymbol.minLotSize = newSymbol.minLotSize;

    if (newSymbol.base && newSymbol.base !== currentSymbol.base)
        currentSymbol.base = newSymbol.base;

    if (newSymbol.quote && newSymbol.quote !== currentSymbol.quote)
        currentSymbol.quote = newSymbol.quote;

    if (newSymbol.basePrecision && newSymbol.basePrecision !== currentSymbol.basePrecision)
        currentSymbol.basePrecision = newSymbol.basePrecision;

    if (newSymbol.quotePrecision && newSymbol.quotePrecision !== currentSymbol.quotePrecision)
        currentSymbol.quotePrecision = newSymbol.quotePrecision;

    if (newSymbol.stepSize && newSymbol.stepSize !== currentSymbol.stepSize)
        currentSymbol.stepSize = newSymbol.stepSize;

    if (newSymbol.tickSize && newSymbol.tickSize !== currentSymbol.tickSize)
        currentSymbol.tickSize = newSymbol.tickSize;

    if (newSymbol.isFavorite !== null && newSymbol.isFavorite !== undefined && newSymbol.isFavorite !== currentSymbol.isFavorite)
        currentSymbol.isFavorite = newSymbol.isFavorite;

    await currentSymbol.save();
}

async function deleteAll() {
    return symbolModel.destroy({ truncate: true });
}

function bulkInsert(symbols) {
    return symbolModel.bulkCreate(symbols);
}

module.exports = {
    getSymbols,
    getSymbol,
    updateSymbol,
    deleteAll,
    bulkInsert,
    searchSymbols,
    getManySymbols
}
