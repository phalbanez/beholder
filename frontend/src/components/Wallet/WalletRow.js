import React from 'react';

/**
 * props:
 * - available
 * - onOrder
 * - symbol
 */
function WalletRow(props) {

    if (!parseFloat(props.available) && !parseFloat(props.onOrder)) return <React.Fragment></React.Fragment>;

    return (
        <tr>
            <td className="text-gray-900">
                <img src={`/img/icons/black/${props.symbol.toLowerCase()}.svg`} className="me-2" width={16} />
                {props.symbol}
            </td>
            <td className="text-gray-900">{props.available.substring(0, 10)}</td>
            <td className="text-gray-900">{props.onOrder.substring(0, 10)}</td>
        </tr>
    )
}

export default WalletRow;