import React, { useEffect, useState } from 'react';

/**
 * props:
 * - type
 * - onChange
 */
function ActionType(props) {

    const [type, setType] = useState('');

    useEffect(() => {
        setType(props.type);
    }, [props.type])

    return (
        <select id="type" className="form-select" value={type} onChange={props.onChange}>
            <option value="ALERT_EMAIL">Alert via Email</option>
            <option value="ALERT_SMS">Alert via SMS</option>
            <option value="ALERT_TELEGRAM">Alert via Telegram</option>
            <option value="ORDER">Place Order</option>
            <option value="TRAILING">Place Trailing</option>
            <option value="WITHDRAW">Withdraw Crypto</option>
        </select>
    )
}

export default ActionType;