const Binance = require('node-binance-api');
const LOGS = process.env.BINANCE_LOGS === 'true';
const SAPI_URL = process.env.BINANCE_SAPI_URL;
const logger = require('./logger');

module.exports = (settings) => {

    if (!settings) throw new Error(`The settings object is required to connect on exchange!`);

    const binance = new Binance().options({
        APIKEY: settings.accessKey,
        APISECRET: settings.secretKey,
        recvWindow: 60000,
        family: 0,
        urls: {
            base: settings.apiUrl.endsWith('/') ? settings.apiUrl : settings.apiUrl + '/',
            stream: settings.streamUrl.endsWith('/') ? settings.streamUrl : settings.streamUrl + '/'
        },
        verbose: LOGS
    });

    function exchangeInfo() {
        return binance.exchangeInfo();
    }

    async function balance() {
        await binance.useServerTime();
        return binance.balance();
    }

    function buy(symbol, quantity, price, options) {
        if (!options.type || options.type === 'MARKET')
            return binance.marketBuy(symbol, quantity, options);

        return binance.buy(symbol, quantity, price, options);
    }

    function sell(symbol, quantity, price, options) {
        if (!options.type || options.type === 'MARKET')
            return binance.marketSell(symbol, quantity, options);

        return binance.sell(symbol, quantity, price, options);
    }

    function cancel(symbol, orderId) {
        return binance.cancel(symbol, orderId);
    }

    function orderStatus(symbol, orderId) {
        return binance.orderStatus(symbol, orderId);
    }

    async function orderTrade(symbol, orderId) {
        const trades = await binance.trades(symbol);
        return trades.find(t => t.orderId === orderId);
    }

    function withdraw(coin, amount, address, network, addressTag) {
        try {
            const data = { coin, amount, address };
            if (addressTag) data.addressTag = addressTag;
            if (network) data.network = network;
            return privateCall(SAPI_URL + 'capital/withdraw/apply', data, 'POST');
        } catch (err) {
            throw new Error(err.response ? JSON.stringify(err.response.data) : err.message);
        }
    }

    async function getCoins() {
        try {
            const coins = await privateCall(SAPI_URL + 'capital/config/getall', null, 'GET');
            return coins.map(c => {
                return {
                    coin: c.coin,
                    networks: c.networkList.map(n => {
                        return {
                            network: n.network,
                            withdrawIntegerMultiple: n.withdrawIntegerMultiple,
                            isDefault: n.isDefault,
                            name: n.name,
                            withdrawFee: n.withdrawFee,
                            withdrawMin: n.withdrawMin,
                            minConfirm: n.minConfirm
                        }
                    })
                }
            })
        } catch (err) {
            throw new Error(err.response ? JSON.stringify(err.response.data) : err.message);
        }
    }

    async function privateCall(apiUrl, data = {}, method = 'GET') {

        const timestamp = Date.now();
        const recvWindow = 60000;

        const axios = require('axios');
        const queryString = new URLSearchParams();
        Object.entries({ ...data, timestamp, recvWindow }).map(prop => queryString.append(prop[0], `${prop[1]}`));

        const signature = require('crypto')
            .createHmac('sha256', settings.secretKey)
            .update(queryString.toString())
            .digest('hex');

        queryString.append('signature', signature);

        const result = await axios({
            method,
            url: `${apiUrl}?${queryString.toString()}`,
            headers: { 'X-MBX-APIKEY': settings.accessKey }
        })

        return result.data;
    }

    function miniTickerStream(callback) {
        binance.websockets.miniTicker(markets => {
            callback(markets)
        });
    }

    function bookStream(callback) {
        binance.websockets.bookTickers(order => {
            callback(order)
        });
    }

    function chartStream(symbol, interval, callback) {
        const streamUrl = binance.websockets.chart(symbol, interval, (symbol, interval, chart) => {
            const tick = binance.last(chart);
            const isIncomplete = tick && chart[tick] && chart[tick].isFinal === false;
            if ((!process.env.INCOMPLETE_CANDLES || process.env.INCOMPLETE_CANDLES === 'false') && isIncomplete)
                return;

            const ohlc = binance.ohlc(chart);
            ohlc.isComplete = !isIncomplete;

            callback(ohlc);
        });
        if (LOGS) logger('system', `Chart Stream connected at ${streamUrl}`);
    }

    function terminateChartStream(symbol, interval) {
        //btcusdt@kline_1m
        binance.websockets.terminate(`${symbol.toLowerCase()}@kline_${interval}`);
        logger('system', `Chart Stream ${symbol.toLowerCase()}@kline_${interval} terminated!`);
    }

    function userDataStream(updateCallback, listStatusCallback) {
        binance.websockets.userData(
            data => updateCallback(data),
            true,
            subscribedData => logger('system', `userDataStream:subscribeEvent: ${JSON.stringify(subscribedData)}`),
            listStatusData => listStatusCallback(listStatusData));
    }

    async function tickerStream(symbol, callback) {
        const streamUrl = binance.websockets.prevDay(symbol, (data, converted) => {
            callback(converted);
        })
        if (LOGS) logger('system', `Ticker Stream connected at ${streamUrl}`);
    }

    function terminateTickerStream(symbol) {
        binance.websockets.terminate(`${symbol.toLowerCase()}@ticker`);
        logger('system', `Ticker Stream disconnected at ${symbol.toLowerCase()}@ticker`);
    }

    return {
        exchangeInfo,
        balance,
        buy,
        sell,
        cancel,
        miniTickerStream,
        bookStream,
        chartStream,
        terminateChartStream,
        terminateTickerStream,
        userDataStream,
        orderStatus,
        orderTrade,
        tickerStream,
        getCoins,
        withdraw
    }
}