import React, { useState, useEffect } from 'react';
import { getSymbols } from '../../services/SymbolsService';

/**
 * props:
 * - coin
 * - onChange
 */
function SelectCoin(props) {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSymbols(token)
            .then(symbols => {
                const coinNames = [...new Set(symbols.map(s => s.base))].sort();
                setCoins(coinNames);
            })
            .catch(err => setCoins([err.response ? err.response.data : err.message]));
    }, [])

    function onCoinChange(event) {
        if (props.onChange)
            props.onChange(event);
    }

    return (
        <select className="form-select" id="coin" value={props.coin} onChange={onCoinChange}>
            <option value="">Select...</option>
            {
                coins
                    ? coins.map(c => (<option key={c}>{c}</option>))
                    : <React.Fragment></React.Fragment>
            }
        </select>
    )
}

export default SelectCoin;