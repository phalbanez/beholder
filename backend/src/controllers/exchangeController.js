const settingsRepository = require('../repositories/settingsRepository');
const ordersRepository = require('../repositories/ordersRepository');
const withdrawTemplatesRepository = require('../repositories/withdrawTemplatesRepository');
const symbolsRepository = require('../repositories/symbolsRepository');
const beholder = require('../beholder');

async function loadBalance(settingsId, fiat) {
    const settings = await settingsRepository.getSettingsDecrypted(settingsId);
    const exchange = require('../utils/exchange')(settings);
    const info = await exchange.balance();

    const coins = Object.entries(info).map(p => p[0]);
    let total = 0;
    await Promise.all(coins.map(async (coin) => {
        let available = parseFloat(info[coin].available);

        beholder.updateMemory(coin, `WALLET`, null, available);

        if (available > 0) available = beholder.tryFiatConversion(coin, available, fiat);

        let onOrder = parseFloat(info[coin].onOrder);
        if (onOrder > 0) onOrder = beholder.tryFiatConversion(coin, onOrder, fiat);

        info[coin].fiatEstimate = available + onOrder;
        total += available + onOrder;
    }))

    info.fiatEstimate = "~" + fiat + " " + total.toFixed(2);
    return info;
}

async function getBalance(req, res, next) {
    const id = res.locals.token.id;
    const fiat = req.params.fiat;

    try {
        const info = await loadBalance(id, fiat);
        res.json(info);
    }
    catch (err) {
        console.error(err.response ? err.response.data : err);
        res.status(500).send(err.response ? err.response.data : err.message);
    }
}

async function getFullBalance(req, res, next) {
    const id = res.locals.token.id;
    const fiat = req.params.fiat;

    try {
        const info = await loadBalance(id, fiat);

        const averages = await ordersRepository.getAveragePrices();//BTCUSDT, BTCBNB, ETHBUSD
        const symbols = await symbolsRepository.getManySymbols(averages.map(a => a.symbol));

        let symbolsObj = {};
        for(let i=0; i < symbols.length; i++){
            const symbol = symbols[i];
            symbolsObj[symbol.symbol] = { base: symbol.base, quote: symbol.quote };
        }

        const grouped = {};
        for(let i=0; i < averages.length; i++){
            const averageObj = averages[i];
            const symbol = symbolsObj[averageObj.symbol];

            if(symbol.quote !== fiat){
                averageObj.avg = beholder.tryFiatConversion(symbol.quote, parseFloat(averageObj.avg), fiat);
                averageObj.net = beholder.tryFiatConversion(symbol.quote, parseFloat(averageObj.net), fiat);
            }
            averageObj.symbol = symbol.base;

            if(!grouped[symbol.base]) grouped[symbol.base] = {net: 0, qty: 0};
            grouped[symbol.base].net += averageObj.net;
            grouped[symbol.base].qty += averageObj.qty;
        }

        const coins = [...new Set(averages.map(a => a.symbol))];
        coins.map(coin => info[coin].avg = grouped[coin].net / grouped[coin].qty);

        res.json(info);
    }
    catch (err) {
        console.error(err.response ? err.response.data : err);
        res.status(500).send(err.response ? err.response.data : err.message);
    }
}

async function getCoins(req, res, next) {
    const id = res.locals.token.id;
    const settings = await settingsRepository.getSettingsDecrypted(id);
    const exchange = require('../utils/exchange')(settings);
    const coins = await exchange.getCoins();
    res.json(coins);
}

async function doWithdraw(req, res, next) {
    const withdrawTemplateId = req.params.id;
    if (!withdrawTemplateId) return res.sendStatus(404);

    const withdrawTemplate = await withdrawTemplatesRepository.getWithdrawTemplate(withdrawTemplateId);
    if (!withdrawTemplate) return res.sendStatus(404);

    let amount = parseFloat(withdrawTemplate.amount);
    if (!amount) {
        if (withdrawTemplate.amount === 'MAX_WALLET') {
            const available = beholder.getMemory(withdrawTemplate.coin, 'WALLET', null);
            if (!available) return res.status(400).json(`No available funds for this coin.`);

            amount = available * (withdrawTemplate.amountMultiplier > 1 ? 1 : withdrawTemplate.amountMultiplier);
        }
        else if (withdrawTemplate.amount === 'LAST_ORDER_QTY') {
            const keys = beholder.searchMemory(new RegExp(`^((${withdrawTemplate.coin}.+|.+${withdrawTemplate.coin}):LAST_ORDER)$`));
            if (!keys || !keys.length) return res.status(400).json(`No last order for this coin.`);

            amount = keys[keys.length - 1].value.quantity * withdrawTemplate.amountMultiplier;
        }
    }

    const settingsId = res.locals.token.id;
    const settings = await settingsRepository.getSettingsDecrypted(settingsId);
    const exchange = require('../utils/exchange')(settings);

    try {
        const result = await exchange.withdraw(withdrawTemplate.coin, amount, withdrawTemplate.address, withdrawTemplate.network, withdrawTemplate.addressTag);
        res.json(result);
    } catch (err) {
        res.status(400).json(err.response ? JSON.stringify(err.response.data) : err.message);
    }
}

module.exports = {
    getBalance,
    getCoins,
    doWithdraw,
    getFullBalance
}