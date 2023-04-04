import React from 'react';

const DEFAULT_FIAT_PROPERTY = "defaultFiat";

/**
 * props:
 * - onChange
 */
function SelectFiat(props) {

    return (
        <select id="selectFiat" className="form-select pe-6" defaultValue={getDefaultFiat()} onChange={props.onChange}>
            <option value="AUD">AUD</option>
            <option value="BRL">BRL</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="NGN">NGN</option>
            <option value="TRY">TRY</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
        </select>
    )
}

export function getDefaultFiat() {
    return localStorage.getItem(DEFAULT_FIAT_PROPERTY) ? localStorage.getItem(DEFAULT_FIAT_PROPERTY) : "USD";
}

export function setDefaultFiat(fiat) {
    localStorage.setItem(DEFAULT_FIAT_PROPERTY, fiat);
}

export default SelectFiat;
