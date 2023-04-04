import React, { useState, useEffect, useMemo } from 'react';

/*
props:
- symbol
- data
*/
function TickerRow(props) {

    const [data, setData] = useState({
        close: '0',
        open: '0',
        high: '0',
        low: '0'
    });

    const tickerRow = useMemo(() => (
        <tr>
            <td className="text-gray-900">
                {props.symbol}
            </td>
            <td className="text-gray-900">
                {`${data.close}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${data.open}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${data.high}`.substring(0, 8)}
            </td>
            <td className="text-gray-900">
                {`${data.low}`.substring(0, 8)}
            </td>
        </tr>
    ), [data.close, data.open, data.high, data.low])

    useEffect(() => {
        if (!props.data || !data.open) return;

        if (data.close !== props.data.close)
            data.close = props.data.close;

        if (data.open !== props.data.open)
            data.open = props.data.open;

        if (data.high !== props.data.high)
            data.high = props.data.high;

        if (data.low !== props.data.low)
            data.low = props.data.low;

        setData(data);
    }, [props.data]);

    return (
        tickerRow
    )
}

export default TickerRow;