import React, { useMemo, useRef, useEffect } from 'react';

/**
 * props:
 * - type
 * - onChange
 */
function MonitorType(props) {

    const selectRef = useRef('');

    useEffect(() => {
        selectRef.current.value = props.type;
        props.onChange({ target: { id: 'type', value: props.type } });
    }, [props.type])

    const selectType = useMemo(() => {
        return (
            <div className="form-group">
                <label htmlFor="side">Type:</label>
                <select id="type" ref={selectRef} className="form-select" onChange={props.onChange}>
                    <option value="CANDLES">Candles</option>
                    <option value="TICKER">Ticker</option>
                </select>
            </div>
        )
    }, [props.type])

    return selectType;
}

export default MonitorType;