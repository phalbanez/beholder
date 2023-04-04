const symbolsRepository = require('../repositories/symbolsRepository');

async function updateSymbol(req, res, next) {
    const symbol = req.params.symbol;
    const newSymbol = req.body;

    const result = await symbolsRepository.updateSymbol(symbol, newSymbol);
    res.json(result);
}

async function getSymbols(req, res, next) {
    const { search, page, onlyFavorites } = req.query;

    let result;
    if (search || page || onlyFavorites === 'true')
        result = await symbolsRepository.searchSymbols(search, onlyFavorites === 'true', page);
    else
        result = await symbolsRepository.getSymbols();

    res.json(result);
}

async function getSymbol(req, res, next) {
    const symbol = req.params.symbol;
    if (symbol.startsWith('*')) return res.json({ symbol, base: '*', quote: symbol.replace('*', '') });
    const symbolObj = await symbolsRepository.getSymbol(symbol);
    res.json(symbolObj);
}

async function syncSymbols(req, res, next) {

    const useBlvt = process.env.BINANCE_BLVT === 'true';
    const ignoredCoins = process.env.IGNORED_COINS ? process.env.IGNORED_COINS.split(',') : [];

    const favoriteSymbols = (await symbolsRepository.getSymbols()).filter(s => s.isFavorite).map(s => s.symbol);

    const settingsRepository = require('../repositories/settingsRepository');
    const settings = await settingsRepository.getSettingsDecrypted(res.locals.token.id);
    const exchange = require('../utils/exchange')(settings);
    let symbols = (await exchange.exchangeInfo()).symbols.map(item => {

        if(!useBlvt && (item.baseAsset.endsWith("UP") || item.baseAsset.endsWith("DOWN"))) return false;
        if(ignoredCoins.includes(item.quoteAsset) || ignoredCoins.includes(item.baseAsset)) return false;

        const minNotionalFilter = item.filters.find(filter => filter.filterType === 'MIN_NOTIONAL');
        const minLotSizeFilter = item.filters.find(filter => filter.filterType === 'LOT_SIZE');
        const priceFilter = item.filters.find(filter => filter.filterType === 'PRICE_FILTER');

        return {
            symbol: item.symbol,
            basePrecision: item.baseAssetPrecision,
            quotePrecision: item.quoteAssetPrecision,
            base: item.baseAsset,
            quote: item.quoteAsset,
            minNotional: minNotionalFilter ? minNotionalFilter.minNotional : '1',
            minLotSize: minLotSizeFilter ? minLotSizeFilter.minQty : '1',
            stepSize: minLotSizeFilter ? minLotSizeFilter.stepSize : '1',
            tickSize: priceFilter ? priceFilter.tickSize : '1',
            isFavorite: favoriteSymbols.some(s => s === item.symbol)
        }
    });

    symbols = symbols.filter(s => s);

    await symbolsRepository.deleteAll();
    await symbolsRepository.bulkInsert(symbols);
    res.sendStatus(201);
}

module.exports = {
    updateSymbol,
    syncSymbols,
    getSymbols,
    getSymbol
}
