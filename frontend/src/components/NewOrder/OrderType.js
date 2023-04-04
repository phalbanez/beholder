import React, { useMemo } from 'react';

/**
 * props:
 * - type
 * - onChange
 */
function OrderType(props) {

    /**
     * Binance sumiu com estes tipos:
     * <option value="ICEBERG">Iceberg</option>
     * <option value="STOP_LOSS">Stop Loss</option>
     * <option value="TAKE_PROFIT">Take Profit</option>
     */

    const orderType = useMemo(() => {
        return (
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select id="type" className="form-select" value={props.type} onChange={props.onChange}>
                    <option value="LIMIT">Limit</option>
                    <option value="MARKET">Market</option>
                    <option value="STOP_LOSS_LIMIT">Stop Loss Limit</option>
                    <option value="TAKE_PROFIT_LIMIT">Take Profit Limit</option>
                    <option value="TRAILING_STOP">Trailing Stop</option>
                </select>
            </div>
        )
    }, [props.type])

    return orderType;
}

export default OrderType;