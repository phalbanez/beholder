import React, { useEffect, useRef } from 'react';

/**
 * props:
 * - id
 * - text
 * - isChecked
 * - onChange
 */
function SwitchInput(props) {

    const selectRef = useRef('');

    function onChange(event) {
        props.onChange({ target: { id: props.id, value: selectRef.current.checked } });
    }

    useEffect(() => {
        selectRef.current.checked = props.isChecked;
    }, [props.isChecked])

    return (
        <div>
            <div className="form-check form-switch">
                <input ref={selectRef} className="form-check-input" type="checkbox" id={props.id} onChange={onChange} />
                <label className="form-check-label" htmlFor={props.id}>{props.text}</label>
            </div>
        </div>
    )
}

export default SwitchInput;