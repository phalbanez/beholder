import React, { useEffect, useState } from 'react';

/**
 * props:
 * - amount
 * - multiplier
 * - onChange
 */
function AmountTemplate(props) {

    const [amountTemplate, setAmountTemplate] = useState({ amount: '', multiplier: 1 });

    useEffect(() => {
        let amount = props.amount;
        if (amount === 'MAX_WALLET')
            amount = 'Max. Wallet';
        else if (amount === 'LAST_ORDER_QTY')
            amount = 'Last Order Qty.';
        setAmountTemplate({ amount, multiplier: props.multiplier });
    }, [props.amount, props.multiplier])

    function onAmountChange(event) {
        let value = event.target.value;
        if (value === 'Max. Wallet')
            value = 'MAX_WALLET';
        else if (value === 'Last Order Qty.')
            value = 'LAST_ORDER_QTY';
        props.onChange({ target: { id: event.target.id, value } });
    }

    return (
        <div className="form-group">
            <label htmlFor="amount">Amount: <span data-bs-toggle="tooltip" data-bs-placement="top" title="Max. Wallet withdraw all you have. Multiplying by 1 = 100%" className="badge bg-warning py-1">?</span></label>
            <div className="input-group">
                <input id="amount" type="text" list="amountOptions" className="form-control w-50" onChange={onAmountChange} placeholder="0" defaultValue={amountTemplate.amount} />
                <span className="input-group-text bg-secondary">x</span>
                <input id="amountMultiplier" type="number" className="form-control" onChange={props.onChange} placeholder="1" defaultValue={amountTemplate.multiplier} />
                <datalist id="amountOptions">
                    <option>Last Order Qty.</option>
                    <option>Max. Wallet</option>
                </datalist>
            </div>
        </div>
    )
}

export default AmountTemplate;