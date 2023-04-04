import React, { useMemo, useRef, useEffect } from 'react';

/**
 * props:
 * - interval
 * - onChange
 */
function SelectInterval(props) {

    const selectRef = useRef('');

    useEffect(() => {
        selectRef.current.value = props.interval;
        props.onChange({ target: { id: 'interval', value: props.interval } });
    }, [props.interval])

    const selectInterval = useMemo(() => {
        return (
            <div className="form-group">
                <label htmlFor="side">Interval:</label>
                <select ref={selectRef} id="interval" className="form-select" defaultValue={props.interval} onChange={props.onChange}>
                    <option value="1m">1 minute</option>
                    <option value="3m">3 minutes</option>
                    <option value="5m">5 minutes</option>
                    <option value="15m">15 minutes</option>
                    <option value="30m">30 minutes</option>
                    <option value="1h">1 hour</option>
                    <option value="2h">2 hours</option>
                    <option value="4h">4 hours</option>
                    <option value="6h">6 hours</option>
                    <option value="8h">8 hours</option>
                    <option value="12h">12 hours</option>
                    <option value="1d">1 day</option>
                    <option value="3d">3 days</option>
                    <option value="1w">1 week</option>
                    <option value="1M">1 month</option>
                </select>
            </div>
        )
    }, [props.interval])

    return selectInterval;
}

export default SelectInterval;