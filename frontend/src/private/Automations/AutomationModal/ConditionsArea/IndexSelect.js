import React, { useEffect, useState } from 'react';

/**
 * props:
 * - indexes
 * - onChange
 */
function IndexSelect(props) {

    const [indexes, setIndexes] = useState([])

    function getOptionText(symbol, variable) {
        return variable === 'WALLET' ? `${symbol}:${variable}` : variable;
    }

    useEffect(() => {
        if (props.indexes && Array.isArray(props.indexes)) {
            setIndexes(props.indexes);
            if (props.indexes.length > 0)
                props.onChange({ target: { id: 'eval', value: props.indexes[0].eval } });
        }
    }, [props.indexes])

    return (
        <React.Fragment>
            <div className="input-group input-group-merge mb-2">
                <span className="input-group-text bg-secondary">
                    When
                </span>
                <select id="eval" className="form-select" onChange={props.onChange}>
                    {
                        indexes && indexes.length > 0
                            ? (
                                indexes.map(item => (
                                    <option key={`${item.symbol}:${item.variable}`} value={item.eval}>{getOptionText(item.symbol, item.variable)}</option>
                                ))
                            )
                            : <option value="">NO KEYS</option>
                    }
                </select>
            </div>
        </React.Fragment>
    )
}

export default IndexSelect;