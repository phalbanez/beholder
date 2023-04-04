import React, { useEffect, useState } from 'react';
import { getCoins } from '../../../services/ExchangeService';

/**
 * props:
 * - coin
 * - network
 * - onChange
 */
function SelectNetwork(props) {

    const [coins, setCoins] = useState([]);
    const [networks, setNetworks] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        getCoins(token)
            .then(coins => setCoins(coins))
            .catch(err => setCoins([err.response ? err.response.data : err.message]));
    }, [])

    useEffect(() => {
        if (!props.coin) return;

        const coin = coins.find(c => c.coin === props.coin);
        if (!coin) return;

        setNetworks(coin.networks);
        setSelectedNetwork(coin.networks.find(n => n.isDefault));
    }, [props.coin])

    function onNetworkChange(event) {

        const network = event.target.value === ''
            ? networks.find(n => n.isDefault)
            : networks.find(n => n.network === event.target.value);

        setSelectedNetwork(network);

        if (props.onChange)
            props.onChange(event);
    }

    function getTip(){
        if(!selectedNetwork || !selectedNetwork.withdrawFee) return "";
        return `Fee: ${selectedNetwork.withdrawFee} - Min: ${selectedNetwork.withdrawMin}`;
    }

    return (
        <React.Fragment>
            <select id="network" onChange={onNetworkChange} className="form-select" value={props.network}>
                <option value="">Default</option>
                {
                    networks
                        ? networks.map(n => (<option key={n.network}>{n.network}</option>))
                        : <React.Fragment></React.Fragment>
                }
            </select>
            <small className="badge bg-secondary text-wrap">{getTip()}</small>
        </React.Fragment>
    )
}

export default SelectNetwork;