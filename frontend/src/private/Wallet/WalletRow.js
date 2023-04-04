import React from 'react';

/**
 * props:
 * - data
 */
function WalletRow(props) {

    return (
        <tr>
            <td>
                <img src={`/img/icons/black/${props.data.symbol.toLowerCase()}.svg`} className="me-2" width={16} />
                {props.data.symbol}
            </td>
            <td>
                {props.data.available.substring(0, 10)}
            </td>
            <td>
                {parseFloat(props.data.onOrder) > 0 ? props.data.onOrder.substring(0, 10) : '-'}
            </td>
            <td>
                {props.data.fiatEstimate ? props.data.fiatEstimate.toFixed(2) : '-'}
            </td>
            <td>
                {props.data.avg ? props.data.avg.toFixed(2) : '-'}
            </td>
        </tr>
    )
}

export default WalletRow;
