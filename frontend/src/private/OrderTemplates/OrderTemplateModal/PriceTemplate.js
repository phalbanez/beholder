import React, { useEffect, useState } from 'react';

/**
 * props:
 * - id
 * - text
 * - indexes
 * - price
 * - multiplier
 * - onChange
 */
function PriceTemplate(props) {

    const [indexes, setIndexes] = useState([]);
    const [priceTemplate, setPriceTemplate] = useState({ price: '', multiplier: '' });

    useEffect(() => {
        if (!props.price) return;

        const simplePrice = props.price.replace("MEMORY['", "").replace("']", "");
        setPriceTemplate({ price: simplePrice, multiplier: props.multiplier });
    }, [props.price, props.multiplier])

    function onPriceChange(event) {
        const value = event.target.value;
        if (parseFloat(value)) return props.onChange(event);

        const index = props.indexes.find(ix => ix.variable === value);
        if (!index) return props.onChange(event);

        props.onChange({ target: { id: props.id, value: index.eval } });
    }

    useEffect(() => {
        setIndexes(props.indexes);
    }, [props.indexes])

    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.text} <span data-bs-toggle="tooltip" data-bs-placement="top" title="Specify a price or choose an index. Multiplying by 1 = 100%." className="badge bg-warning py-1">?</span></label>
            <div className="input-group">
                <input id={props.id} list="variables" type="text" className="form-control w-50" onChange={onPriceChange} placeholder="0" value={priceTemplate.price || ""} />
                <span className="input-group-text bg-secondary">
                    X
                </span>
                <input id={props.id + "Multiplier"} type="number" className="form-control" onChange={props.onChange} placeholder="1" value={priceTemplate.multiplier || ""} />
                <datalist id="variables">
                    {
                        indexes && Array.isArray(indexes)   
                            ? (
                                indexes.map(item => (
                                    <option key={`${item.symbol}:${item.variable}`}>{item.variable}</option>
                                ))
                            )
                            : <option value="">NO INDEXES</option>
                    }
                </datalist>
            </div>
        </div>
    )
}

export default PriceTemplate;
