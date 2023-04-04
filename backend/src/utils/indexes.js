const technicalindicators = require('technicalindicators');

const indexKeys = {
    //CANDLES PATTERNS
    INSIDE_CANDLE: 'INSIDE-CANDLE',
    ABANDONED_BABY: 'ABANDONED-BABY',
    BEARISH_ENGULFING: 'BEAR-ENGULF',
    BULLISH_ENGULFING: 'BULL-ENGULF',
    DARK_CLOUD_COVER: 'DARK-CLOUD-COVER',
    DOWNSIDE_TASUKI_GAP: 'DOWNSIDE-TASUKI-GAP',
    DOJI: 'DOJI',
    DRAGONFLY_DOJI: 'DRAGONFLY-DOJI',
    GRAVESTONE_DOJI: 'GRAVESTONE-DOJI',
    BEARISH_HARAMI: 'BEAR-HARAMI',
    BULLISH_HARAMI: 'BULL-HARAMI',
    BEARISH_HARAMI_CROSS: 'BEAR-HARAMIX',
    BULLISH_HARAMI_CROSS: 'BULL-HARAMIX',
    BULLISH_MARUBOZU: 'BULL-MARUBOZU',
    BEARISH_MARUBOZU: 'BEAR-MARUBOZU',
    EVENING_DOJI_STAR: 'EVENING-DOJI-STAR',
    EVENING_STAR: 'EVENINGSTAR',
    PIERCING_LINE: 'PIERCING-LINE',
    BULLISH_SPINNING_TOP: 'BULL-SPINTOP',
    BEARISH_SPINNING_TOP: 'BEAR-SPINTOP',
    MORNING_DOJI_STAR: 'MORNING-DOJI-STAR',
    MORNING_STAR: 'MORNING-STAR',
    _3BLACK_CROWS: '3BLACK-CROWS',
    _3WHITE_SOLDIERS: '3WHITE-SOLDIERS',
    BULLISH_HAMMER: 'BULLHAMMER',
    BEARISH_HAMMER: 'BEARHAMMER',
    BULLISH_INVERTED_HAMMER: 'BULL-INVERT-HAMMER',
    BEARISH_INVERTED_HAMMER: 'BEAR-INVERT-HAMMER',
    HAMMER: 'HAMMER',
    HAMMER_UNCONFIRMED: 'HAMMER-UNCONF',
    HANGING_MAN: 'HANGMAN',
    HANGING_MAN_UNCONFIRMED: 'HANGMAN-UNCONF',
    SHOOTING_STAR: 'SHOOTSTAR',
    SHOOTING_STAR_UNCONFIRMED: 'SHOOTSTAR-UNCONF',
    TWEEZER_TOP: 'TWEEZER-TOP',
    TWEEZER_BOTTOM: 'TWEEZER-BOTTOM',
    //TECHNICAL INDICATORS
    RSI: 'RSI',
    MACD: 'MACD',
    SMA: 'SMA',
    EMA: 'EMA',
    STOCH_RSI: 'S-RSI',
    BOLLINGER_BANDS: 'BB',
    ADL: 'ADL',
    ADX: 'ADX',
    ATR: 'ATR',
    AWESOME_OSCILLATOR: 'AO',
    CCI: 'CCI',
    FORCE_INDEX: 'FI',
    KST: 'KST',
    MFI: 'MFI',
    OBV: 'OBV',
    PSAR: 'PSAR',
    ROC: 'ROC',
    STOCH: 'STOCH',
    TRIX: 'TRIX',
    TYPICAL_PRICE: 'TYPICAL',
    VWAP: 'VWAP',
    VOLUME_PROFILE: 'VP',
    WMA: 'WMA',
    WEMA: 'WEMA',
    WILLIAMS_R: 'WILLIAMS-R',
    ICHIMOKU: 'ICHIMOKU',
    //BEHOLDER INDICATORS
    MINI_TICKER: 'MINI_TICKER',
    BOOK: 'BOOK',
    WALLET: 'WALLET',
    LAST_ORDER: 'LAST_ORDER',
    LAST_CANDLE: 'LAST_CANDLE',
    PREVIOUS_CANDLE: 'PREVIOUS_CANDLE',
    TICKER: 'TICKER'
}

function getAnalysisIndexes() {
    return {
        [indexKeys.RSI]: { params: 'period', name: 'RSI' },
        [indexKeys.MACD]: { params: 'fast,slow,signal', name: 'MACD' },
        [indexKeys.SMA]: { params: 'period', name: 'SMA' },
        [indexKeys.EMA]: { params: 'period', name: 'EMA' },
        [indexKeys.STOCH_RSI]: { params: 'd,k,rsi,stoch', name: 'Stochastic RSI' },
        [indexKeys.BOLLINGER_BANDS]: { params: 'period,stdDev', name: 'Bollinger Bands (BB)' },
        [indexKeys.ADL]: { params: 'none', name: 'ADL' },
        [indexKeys.ADX]: { params: 'period', name: 'ADX' },
        [indexKeys.ATR]: { params: 'period', name: 'ATR' },
        [indexKeys.AWESOME_OSCILLATOR]: { params: 'fast,slow', name: 'Awesome Oscillator' },
        [indexKeys.CCI]: { params: 'period', name: 'CCI' },
        [indexKeys.FORCE_INDEX]: { params: 'period', name: 'Force Index' },
        [indexKeys.KST]: { params: 'roc1,roc2,roc3,roc4,smaroc1,smaroc2,smaroc3,smaroc4,signal', name: 'KST' },
        [indexKeys.MFI]: { params: 'period', name: 'MFI' },
        [indexKeys.OBV]: { params: 'none', name: 'OBV' },
        [indexKeys.PSAR]: { params: 'step,max', name: 'PSAR' },
        [indexKeys.ROC]: { params: 'period', name: 'ROC' },
        [indexKeys.STOCH]: { params: 'period,signal', name: 'Stochastic' },
        [indexKeys.TRIX]: { params: 'period', name: 'TRIX' },
        [indexKeys.TYPICAL_PRICE]: { params: 'none', name: 'Typical Price' },
        [indexKeys.VWAP]: { params: 'none', name: 'VWAP' },
        [indexKeys.VOLUME_PROFILE]: { params: 'bars', name: 'Volume Profile' },
        [indexKeys.WMA]: { params: 'period', name: 'WMA' },
        [indexKeys.WEMA]: { params: 'period', name: 'WEMA' },
        [indexKeys.WILLIAMS_R]: { params: 'period', name: 'Williams R' },
        [indexKeys.ICHIMOKU]: { params: 'conversion,base,span,displacement', name: 'Ichimoku' },
        [indexKeys.ABANDONED_BABY]: { params: 'none', name: 'Abandoned Baby' },
        [indexKeys.BEARISH_ENGULFING]: { params: 'none', name: 'Bearish Engulfing' },
        [indexKeys.BULLISH_ENGULFING]: { params: 'none', name: 'Bullish Engulfing' },
        [indexKeys.DARK_CLOUD_COVER]: { params: 'none', name: 'Dark Cloud Cover' },
        [indexKeys.DOWNSIDE_TASUKI_GAP]: { params: 'none', name: 'Downside Tasuki Gap' },
        [indexKeys.DOJI]: { params: 'none', name: 'Doji' },
        [indexKeys.DRAGONFLY_DOJI]: { params: 'none', name: 'DragonFly Doji' },
        [indexKeys.GRAVESTONE_DOJI]: { params: 'none', name: 'GraveStone Doji' },
        [indexKeys.BEARISH_HARAMI]: { params: 'none', name: 'Bearish Harami' },
        [indexKeys.BEARISH_HARAMI_CROSS]: { params: 'none', name: 'Bearish Harami Cross (X)' },
        [indexKeys.BULLISH_HARAMI]: { params: 'none', name: 'Bullish Harami' },
        [indexKeys.BULLISH_HARAMI_CROSS]: { params: 'none', name: 'Bullish Harami Cross (X)' },
        [indexKeys.BULLISH_MARUBOZU]: { params: 'none', name: 'Bullish Marubozu' },
        [indexKeys.BEARISH_MARUBOZU]: { params: 'none', name: 'Bearish Marubozu' },
        [indexKeys.EVENING_DOJI_STAR]: { params: 'none', name: 'Evening Doji Star' },
        [indexKeys.EVENING_STAR]: { params: 'none', name: 'Evening Star' },
        [indexKeys.PIERCING_LINE]: { params: 'none', name: 'Piercing Line' },
        [indexKeys.BULLISH_SPINNING_TOP]: { params: 'none', name: 'Bullish Spinning Top' },
        [indexKeys.BEARISH_SPINNING_TOP]: { params: 'none', name: 'Bearish Spinning Top' },
        [indexKeys.MORNING_DOJI_STAR]: { params: 'none', name: 'Morning Doji Star' },
        [indexKeys.MORNING_STAR]: { params: 'none', name: 'Morning Star' },
        [indexKeys._3BLACK_CROWS]: { params: 'none', name: '3 Black Crows' },
        [indexKeys._3WHITE_SOLDIERS]: { params: 'none', name: '3 White Soldiers' },
        [indexKeys.BULLISH_HAMMER]: { params: 'none', name: 'Bullish Hammer' },
        [indexKeys.BEARISH_HAMMER]: { params: 'none', name: 'Bearish Hammer' },
        [indexKeys.BULLISH_INVERTED_HAMMER]: { params: 'none', name: 'Bullish Inverted Hammer' },
        [indexKeys.BEARISH_INVERTED_HAMMER]: { params: 'none', name: 'Bearish Inverted Hammer' },
        [indexKeys.HAMMER]: { params: 'none', name: 'Hammer' },
        [indexKeys.HAMMER_UNCONFIRMED]: { params: 'none', name: 'Hammer (Unconf.)' },
        [indexKeys.HANGING_MAN]: { params: 'none', name: 'Hanging Man' },
        [indexKeys.HANGING_MAN_UNCONFIRMED]: { params: 'none', name: 'Haning Man (Unconf.)' },
        [indexKeys.SHOOTING_STAR]: { params: 'none', name: 'Shooting Star' },
        [indexKeys.SHOOTING_STAR_UNCONFIRMED]: { params: 'none', name: 'Shooting Star (Unconf.)' },
        [indexKeys.TWEEZER_TOP]: { params: 'none', name: 'Tweezer Top' },
        [indexKeys.TWEEZER_BOTTOM]: { params: 'none', name: 'Tweezer Bottom' },
        [indexKeys.INSIDE_CANDLE]: { params: 'bars', name: 'Inside Candle' },
    }
}

function execCalc(indexName, ohlc, ...params) {
    switch (indexName) {
        case indexKeys.INSIDE_CANDLE: return insideCandle(ohlc, ...params);
        case indexKeys.ABANDONED_BABY: return abandonedBaby(ohlc);
        case indexKeys.ADL: return ADL(ohlc);
        case indexKeys.ADX: return ADX(ohlc, ...params);
        case indexKeys.ATR: return ATR(ohlc, ...params);
        case indexKeys.AWESOME_OSCILLATOR: return AO(ohlc, ...params);
        case indexKeys.BEARISH_ENGULFING: return bearishEngulfing(ohlc);
        case indexKeys.BEARISH_HARAMI: return bearishHarami(ohlc);
        case indexKeys.BULLISH_HARAMI: return bullishHarami(ohlc);
        case indexKeys.BEARISH_HARAMI_CROSS: return bearishHaramiCross(ohlc);
        case indexKeys.BULLISH_HARAMI_CROSS: return bullishHaramiCross(ohlc);
        case indexKeys.BULLISH_MARUBOZU: return bullishMarubozu(ohlc);
        case indexKeys.BEARISH_MARUBOZU: return bearishMarubozu(ohlc);
        case indexKeys.EVENING_DOJI_STAR: return eveningDojiStar(ohlc);
        case indexKeys.EVENING_STAR: return eveningStar(ohlc);
        case indexKeys.PIERCING_LINE: return piercingLine(ohlc);
        case indexKeys.BULLISH_SPINNING_TOP: return bullishSpinningTop(ohlc);
        case indexKeys.BEARISH_SPINNING_TOP: return bearishSpinningTop(ohlc);
        case indexKeys.MORNING_DOJI_STAR: return morningDojiStar(ohlc);
        case indexKeys.MORNING_STAR: return morningStar(ohlc);
        case indexKeys._3BLACK_CROWS: return threeBlackCrows(ohlc);
        case indexKeys._3WHITE_SOLDIERS: return threeWhiteSoldiers(ohlc);
        case indexKeys.BULLISH_HAMMER: return bullishHammer(ohlc);
        case indexKeys.BEARISH_HAMMER: return bearishHammer(ohlc);
        case indexKeys.BULLISH_INVERTED_HAMMER: return bullishInvertedHammer(ohlc);
        case indexKeys.BEARISH_INVERTED_HAMMER: return bearishInvertedHammer(ohlc);
        case indexKeys.HAMMER: return hammer(ohlc);
        case indexKeys.HAMMER_UNCONFIRMED: return hammerUnconfirmed(ohlc);
        case indexKeys.HANGING_MAN: return hangingMan(ohlc);
        case indexKeys.HANGING_MAN_UNCONFIRMED: return hangingManUnconfirmed(ohlc);
        case indexKeys.SHOOTING_STAR: return shootingStar(ohlc);
        case indexKeys.SHOOTING_STAR_UNCONFIRMED: return shootingStarUnconfirmed(ohlc);
        case indexKeys.TWEEZER_TOP: return tweezerTop(ohlc);
        case indexKeys.TWEEZER_BOTTOM: return tweezerBottom(ohlc);
        case indexKeys.BOLLINGER_BANDS: return bollingerBands(ohlc.close, ...params);
        case indexKeys.BULLISH_ENGULFING: return bullishEngulfing(ohlc);
        case indexKeys.CCI: return CCI(ohlc, ...params);
        case indexKeys.DARK_CLOUD_COVER: return darkCloudCover(ohlc);
        case indexKeys.DOJI: return doji(ohlc);
        case indexKeys.DOWNSIDE_TASUKI_GAP: return downsideTasukiGap(ohlc);
        case indexKeys.DRAGONFLY_DOJI: return dragonflyDoji(ohlc);
        case indexKeys.EMA: return EMA(ohlc.close, ...params);
        case indexKeys.FORCE_INDEX: return FI(ohlc, ...params);
        case indexKeys.GRAVESTONE_DOJI: return graveStoneDoji(ohlc);
        case indexKeys.ICHIMOKU: return ichimoku(ohlc, ...params);
        case indexKeys.KST: return KST(ohlc.close, ...params);
        case indexKeys.MACD: return MACD(ohlc.close, ...params);
        case indexKeys.MFI: return MFI(ohlc, ...params);
        case indexKeys.OBV: return OBV(ohlc);
        case indexKeys.PSAR: return PSAR(ohlc, ...params);
        case indexKeys.ROC: return ROC(ohlc.close, ...params);
        case indexKeys.RSI: return RSI(ohlc.close, ...params);
        case indexKeys.SMA: return SMA(ohlc.close, ...params);
        case indexKeys.STOCH: return Stochastic(ohlc, ...params);
        case indexKeys.STOCH_RSI: return StochRSI(ohlc.close, ...params);
        case indexKeys.TRIX: return TRIX(ohlc.close, ...params);
        case indexKeys.VOLUME_PROFILE: return VP(ohlc, ...params);
        case indexKeys.VWAP: return VWAP(ohlc);
        case indexKeys.WILLIAMS_R: return williamsR(ohlc, ...params);
        case indexKeys.WEMA: return WEMA(ohlc.close, ...params);
        case indexKeys.WMA: return WMA(ohlc.close, ...params);
        default: throw new Error(`Unknown index name: ${indexName}`);
    }
}

function getInsideCandle(ohlc, last, bars) {
    let hasInsideCandle = ohlc.high[last] < ohlc.high[last - 1] && ohlc.low[last] > ohlc.low[last - 1];
    if (hasInsideCandle && bars > 1) {
        for (let i = 1; i < bars; i++)
            hasInsideCandle = hasInsideCandle && ohlc.high[last - i] < ohlc.high[last - i - 1] && ohlc.low[last - i] > ohlc.low[last - i - 1];
    }
    return hasInsideCandle;
}

function insideCandle(ohlc, bars = 1) {
    const current = getInsideCandle(ohlc, ohlc.high.length - 1, bars);
    const previous = getInsideCandle(ohlc, ohlc.high.length - 2, bars);
    return { current, previous };
}

function abandonedBaby(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.abandonedbaby(input);
}

function bullishEngulfing(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bullishengulfingpattern(input);
}

function bearishEngulfing(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bearishengulfingpattern(input);
}

function darkCloudCover(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.darkcloudcover(input);
}

function downsideTasukiGap(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.downsidetasukigap(input);
}

function doji(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.doji(input);
}

function dragonflyDoji(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.dragonflydoji(input);
}

function graveStoneDoji(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.gravestonedoji(input);
}

function bearishHarami(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bearishharami(input);
}

function bullishHarami(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bullishharami(input);
}

function bullishHaramiCross(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bullishharamicross(input);
}

function bearishHaramiCross(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.bearishharamicross(input);
}

function bullishMarubozu(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bullishmarubozu(input);
}

function bearishMarubozu(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bearishmarubozu(input);
}

function eveningDojiStar(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.eveningdojistar(input);
}

function eveningStar(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.eveningstar(input);
}

function piercingLine(ohlc) {
    const input = getTwoCandles(ohlc);
    return technicalindicators.piercingline(input);
}

function bullishSpinningTop(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bullishspinningtop(input);
}

function bearishSpinningTop(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bearishspinningtop(input);
}

function morningDojiStar(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.morningdojistar(input);
}

function morningStar(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.morningstar(input);
}

function threeBlackCrows(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.threeblackcrows(input);
}

function threeWhiteSoldiers(ohlc) {
    const input = getThreeCandles(ohlc);
    return technicalindicators.threewhitesoldiers(input);
}

function bullishHammer(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bullishhammerstick(input);
}

function bearishHammer(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bearishhammerstick(input);
}

function bearishInvertedHammer(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bearishinvertedhammerstick(input);
}

function bullishInvertedHammer(ohlc) {
    const input = getOneCandle(ohlc);
    return technicalindicators.bullishinvertedhammerstick(input);
}

function hammer(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.hammerpattern(input);
}

function hammerUnconfirmed(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.hammerpatternunconfirmed(input);
}

function hangingMan(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.hangingman(input);
}

function hangingManUnconfirmed(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.hangingmanunconfirmed(input);
}

function shootingStar(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.shootingstar(input);
}

function shootingStarUnconfirmed(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.shootingstarunconfirmed(input);
}

function tweezerTop(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.tweezertop(input);
}

function tweezerBottom(ohlc) {
    const input = getFiveCandles(ohlc);
    return technicalindicators.tweezerbottom(input);
}

function getFiveCandles(ohlc) {
    const last = ohlc.high.length - 1;
    return {
        open: [ohlc.open[last], ohlc.open[last - 1], ohlc.open[last - 2], ohlc.open[last - 3], ohlc.open[last - 4]],
        close: [ohlc.close[last], ohlc.close[last - 1], ohlc.close[last - 2], ohlc.close[last - 3], ohlc.close[last - 4]],
        high: [ohlc.high[last], ohlc.high[last - 1], ohlc.high[last - 2], ohlc.high[last - 3], ohlc.high[last - 4]],
        low: [ohlc.low[last], ohlc.low[last - 1], ohlc.low[last - 2], ohlc.low[last - 3], ohlc.low[last - 4]],
        volume: [ohlc.volume[last], ohlc.volume[last - 1], ohlc.volume[last - 2], ohlc.volume[last - 3], ohlc.volume[last - 4]],
    }
}

function getThreeCandles(ohlc) {
    const last = ohlc.high.length - 1;
    return {
        open: [ohlc.open[last], ohlc.open[last - 1], ohlc.open[last - 2]],
        close: [ohlc.close[last], ohlc.close[last - 1], ohlc.close[last - 2]],
        high: [ohlc.high[last], ohlc.high[last - 1], ohlc.high[last - 2]],
        low: [ohlc.low[last], ohlc.low[last - 1], ohlc.low[last - 2]],
        volume: [ohlc.volume[last], ohlc.volume[last - 1], ohlc.volume[last - 2]],
    }
}

function getTwoCandles(ohlc) {
    const last = ohlc.high.length - 1;
    return {
        open: [ohlc.open[last], ohlc.open[last - 1]],
        close: [ohlc.close[last], ohlc.close[last - 1]],
        high: [ohlc.high[last], ohlc.high[last - 1]],
        low: [ohlc.low[last], ohlc.low[last - 1]],
        volume: [ohlc.volume[last], ohlc.volume[last - 1]],
    }
}

function getOneCandle(ohlc) {
    const last = ohlc.high.length - 1;
    return {
        open: [ohlc.open[last]],
        close: [ohlc.close[last]],
        high: [ohlc.high[last]],
        low: [ohlc.low[last]],
        volume: [ohlc.volume[last]],
    }
}

function ADL(ohlc) {
    const adlResult = technicalindicators.adl(ohlc);
    return {
        current: adlResult[adlResult.length - 1],
        previous: adlResult[adlResult.length - 2]
    }
}

function ADX(ohlc, period = 14) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const adxResult = technicalindicators.adx({
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        period
    })
    return {
        current: adxResult[adxResult.length - 1],
        previous: adxResult[adxResult.length - 2]
    }
}

function ATR(ohlc, period = 14) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const atrResult = technicalindicators.atr({
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        period
    })
    return {
        current: atrResult[atrResult.length - 1],
        previous: atrResult[atrResult.length - 2]
    }
}

function AO(ohlc, fastPeriod = 5, slowPeriod = 34) {
    fastPeriod = parseInt(fastPeriod);
    slowPeriod = parseInt(slowPeriod);
    if ([fastPeriod, slowPeriod].some(p => p >= ohlc.high.length)) return { current: false, previous: false };

    const aoResult = technicalindicators.awesomeoscillator({
        high: ohlc.high,
        low: ohlc.low,
        fastPeriod,
        slowPeriod
    })
    return {
        current: aoResult[aoResult.length - 1],
        previous: aoResult[aoResult.length - 2]
    }
}

function CCI(ohlc, period = 20) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const cciResult = technicalindicators.cci({
        open: ohlc.open,
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        period
    })
    return {
        current: cciResult[cciResult.length - 1],
        previous: cciResult[cciResult.length - 2]
    }
}

function FI(ohlc, period = 1) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const fiResult = technicalindicators.forceindex({
        open: ohlc.open,
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        volume: ohlc.volume,
        period
    })
    return {
        current: fiResult[fiResult.length - 1],
        previous: fiResult[fiResult.length - 2]
    }
}

function KST(closes, ROCPer1 = 10, ROCPer2 = 15, ROCPer3 = 20, ROCPer4 = 30, SMAROCPer1 = 10, SMAROCPer2 = 10, SMAROCPer3 = 10, SMAROCPer4 = 15, signal = 3) {
    ROCPer1 = parseInt(ROCPer1);
    ROCPer2 = parseInt(ROCPer2);
    ROCPer3 = parseInt(ROCPer3);
    ROCPer4 = parseInt(ROCPer4);
    SMAROCPer1 = parseInt(SMAROCPer1);
    SMAROCPer2 = parseInt(SMAROCPer2);
    SMAROCPer3 = parseInt(SMAROCPer3);
    SMAROCPer4 = parseInt(SMAROCPer4);

    if ([ROCPer1, ROCPer2, ROCPer3, ROCPer4, SMAROCPer1, SMAROCPer2, SMAROCPer3, SMAROCPer4].some(p => p >= closes.length))
        return { current: false, previous: false };

    const kstResult = technicalindicators.kst({
        values: closes,
        ROCPer1,
        ROCPer2,
        ROCPer3,
        ROCPer4,
        SMAROCPer1,
        SMAROCPer2,
        SMAROCPer3,
        SMAROCPer4,
        signalPeriod: parseInt(signal),
    })
    return {
        current: kstResult[kstResult.length - 1],
        previous: kstResult[kstResult.length - 2]
    }
}

function MFI(ohlc, period = 14) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const mfiResult = technicalindicators.mfi({
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        volume: ohlc.volume,
        period
    })
    return {
        current: mfiResult[mfiResult.length - 1],
        previous: mfiResult[mfiResult.length - 2]
    }
}

function OBV(ohlc) {
    const obvResult = technicalindicators.obv({
        close: ohlc.close,
        volume: ohlc.volume
    })
    return {
        current: obvResult[obvResult.length - 1],
        previous: obvResult[obvResult.length - 2]
    }
}

function PSAR(ohlc, step, max) {
    const psarResult = technicalindicators.psar({
        high: ohlc.high,
        low: ohlc.low,
        step: parseFloat(step) || 0.02,
        max: parseFloat(max) || 0.2
    })
    return {
        current: psarResult[psarResult.length - 1],
        previous: psarResult[psarResult.length - 2]
    }
}

function ROC(closes, period = 12) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const rocResult = technicalindicators.roc({
        period,
        values: closes
    })
    return {
        current: rocResult[rocResult.length - 1],
        previous: rocResult[rocResult.length - 2]
    }
}

function Stochastic(ohlc, period = 14, signal = 3) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const stochResult = technicalindicators.stochastic({
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        period,
        signalPeriod: signal
    })
    return {
        current: stochResult[stochResult.length - 1],
        previous: stochResult[stochResult.length - 2]
    }
}

function TRIX(closes, period = 18) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const trixResult = technicalindicators.trix({
        period,
        values: closes
    })
    return {
        current: trixResult[trixResult.length - 1],
        previous: trixResult[trixResult.length - 2]
    }
}

function VWAP(ohlc) {
    const vwapResult = technicalindicators.vwap(ohlc);
    return {
        current: vwapResult[vwapResult.length - 1],
        previous: vwapResult[vwapResult.length - 2]
    }
}

function VP(ohlc, bars = 14) {
    bars = parseInt(bars);
    if (ohlc.close.length <= bars) return { current: false, previous: false };

    const vpResult = technicalindicators.volumeprofile({
        open: ohlc.open,
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        volume: ohlc.volume,
        noOfBars: bars
    })
    return {
        current: vpResult[vpResult.length - 1],
        previous: vpResult[vpResult.length - 2]
    }
}

function williamsR(ohlc, period = 14) {
    period = parseInt(period);
    if (ohlc.close.length <= period) return { current: false, previous: false };

    const wrResult = technicalindicators.williamsr({
        open: ohlc.open,
        high: ohlc.high,
        low: ohlc.low,
        close: ohlc.close,
        period
    })
    return {
        current: wrResult[wrResult.length - 1],
        previous: wrResult[wrResult.length - 2]
    }
}

function ichimoku(ohlc, conversionPeriod = 9, basePeriod = 26, span = 52, displacement = 26) {
    conversionPeriod = parseInt(conversionPeriod);
    basePeriod = parseInt(basePeriod);
    span = parseInt(span);
    displacement = parseInt(displacement);

    if ([conversionPeriod, basePeriod, span, displacement].some(p => p >= ohlc.high.length))
        return { current: false, previous: false };

    const ichimokuResult = technicalindicators.ichimokucloud({
        high: ohlc.high,
        low: ohlc.low,
        conversionPeriod,
        basePeriod,
        span,
        displacement
    })
    return {
        current: ichimokuResult[ichimokuResult.length - 1],
        previous: ichimokuResult[ichimokuResult.length - 2]
    }
}

function WMA(closes, period = 8) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const wmaResult = technicalindicators.wma({
        period,
        values: closes
    })
    return {
        current: wmaResult[wmaResult.length - 1],
        previous: wmaResult[wmaResult.length - 2]
    }
}

function WEMA(closes, period = 5) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const wemaResult = technicalindicators.wema({
        period,
        values: closes
    })
    return {
        current: wemaResult[wemaResult.length - 1],
        previous: wemaResult[wemaResult.length - 2]
    }
}

function RSI(closes, period = 14) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const rsiResult = technicalindicators.rsi({
        period,
        values: closes
    })
    return {
        current: parseFloat(rsiResult[rsiResult.length - 1]),
        previous: parseFloat(rsiResult[rsiResult.length - 2]),
    }
}

function MACD(closes, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    fastPeriod = parseInt(fastPeriod);
    slowPeriod = parseInt(slowPeriod);
    signalPeriod = parseInt(signalPeriod);

    if ([fastPeriod, slowPeriod, signalPeriod].some(p => p >= closes.length)) return { current: false, previous: false };

    const macdResult = technicalindicators.macd({
        values: closes,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
        fastPeriod,
        slowPeriod,
        signalPeriod
    });
    return {
        current: macdResult[macdResult.length - 1],
        previous: macdResult[macdResult.length - 2]
    }
}

function StochRSI(closes, dPeriod = 3, kPeriod = 3, rsiPeriod = 14, stochasticPeriod = 14) {
    dPeriod = parseInt(dPeriod);
    kPeriod = parseInt(kPeriod);
    rsiPeriod = parseInt(rsiPeriod);
    stochasticPeriod = parseInt(stochasticPeriod);

    if ([dPeriod, kPeriod, rsiPeriod, stochasticPeriod].some(p => p >= closes.length)) return { current: false, previous: false };

    const stochResult = technicalindicators.stochasticrsi({
        dPeriod,
        kPeriod,
        rsiPeriod,
        stochasticPeriod,
        values: closes
    });
    return {
        current: stochResult[stochResult.length - 1],
        previous: stochResult[stochResult.length - 2]
    }
}

function bollingerBands(closes, period = 20, stdDev = 2) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const bbResult = technicalindicators.bollingerbands({
        period,
        stdDev: parseInt(stdDev),
        values: closes
    })
    return {
        current: bbResult[bbResult.length - 1],
        previous: bbResult[bbResult.length - 2]
    }
}

function SMA(closes, period = 10) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const smaResult = technicalindicators.sma({
        values: closes,
        period
    });
    return {
        current: smaResult[smaResult.length - 1],
        previous: smaResult[smaResult.length - 2],
    }
}

function EMA(closes, period = 10) {
    period = parseInt(period);
    if (closes.length <= period) return { current: false, previous: false };

    const emaResult = technicalindicators.ema({
        values: closes,
        period
    });
    return {
        current: emaResult[emaResult.length - 1],
        previous: emaResult[emaResult.length - 2],
    }
}

module.exports = {
    indexKeys,
    execCalc,
    getAnalysisIndexes
}
