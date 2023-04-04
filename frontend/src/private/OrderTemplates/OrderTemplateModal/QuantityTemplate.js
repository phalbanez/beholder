import React, { useEffect, useState } from 'react';

/**
 * props:
 * - id
 * - text
 * - quantity
 * - multiplier
 * - onChange
 */
function QuantityTemplate(props) {

    const [quantityTemplate, setQuantityTemplate] = useState({ quantity: '', multiplier: '' });

    useEffect(() => {
        let qty = props.quantity;
        if (props.quantity === 'MAX_WALLET')
            qty = 'Max. Wallet';
        else if (props.quantity === 'MIN_NOTIONAL')
            qty = 'Min. Notional';
        else if (props.quantity === 'LAST_ORDER_QTY')
            qty = 'Last Order Qty.';
        setQuantityTemplate({ quantity: qty, multiplier: props.multiplier });
    }, [props.quantity, props.multiplier])

    function onQuantityChange(event) {
        let value = event.target.value;
        if (event.target.value === 'Max. Wallet')
            value = 'MAX_WALLET';
        else if (event.target.value === 'Min. Notional')
            value = 'MIN_NOTIONAL';
        else if (event.target.value === 'Last Order Qty.')
            value = 'LAST_ORDER_QTY';
        props.onChange({ target: { id: props.id, value } });
    }

    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.text} <span data-bs-toggle="tooltip" data-bs-placement="top" title="Max. Wallet trades the maximum you have. Min. Notional trades the minimum allowed. Multiplying by 1 = 100%." className="badge bg-warning py-1">?</span></label>
            <div className="input-group">
                <input id={props.id} list="qtyOptions" type="text" className="form-control w-50" onChange={onQuantityChange} placeholder="0" value={quantityTemplate.quantity || ""} />
                <span className="input-group-text bg-secondary">
                    X
                </span>
                <input id={props.id + "Multiplier"} type="number" className="form-control" onChange={props.onChange} placeholder="1" value={quantityTemplate.multiplier || ""} />
                <datalist id="qtyOptions">
                    <option>Last Order Qty.</option>
                    <option>Max. Wallet</option>
                    <option>Min. Notional</option>
                </datalist>
            </div>
        </div>
    )
}

export default QuantityTemplate;