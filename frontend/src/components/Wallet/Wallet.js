import React, { useEffect, useState } from 'react';
import { getBalance } from '../../services/ExchangeService';
import WalletRow from './WalletRow';

/**
 * props:
 * - data
 * - onUpdate
 */
function Wallet(props) {

    const [balances, setBalances] = useState([]);
    const [fiat, setFiat] = useState("");

    function getBalanceCall() {
        const token = localStorage.getItem("token");

        getBalance(token)
            .then((info) => {
                const balances = Object.entries(info).map(item => {
                    return {
                        symbol: item[0],
                        available: item[1].available,
                        onOrder: item[1].onOrder
                    }
                })
                    .sort((a, b) => {
                        if (a.symbol > b.symbol) return 1;
                        if (a.symbol < b.symbol) return -1;
                        return 0;
                    });

                if (props.onUpdate)
                    props.onUpdate(balances);

                setBalances(balances);
                setFiat(info.fiatEstimate);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message)
            })
    }

    useEffect(() => {
        if (props.data && Object.entries(props.data).length) {
            setBalances(props.data);
            const total = props.data.find(s => s.symbol === 'fiatEstimate');
            setFiat(total);
        }
        else
            getBalanceCall();
    }, [props.data])

    return (<React.Fragment>
        <div className="col-md-6 col-sm-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h2 className="fs-5 fw-bold mb-0">Wallet</h2>
                        </div>
                        <div className="col-5">
                            {fiat}
                        </div>
                        <div className="col-2">
                            <a href="/wallet" className="btn btn-primary btn-sm ms-2 me-2">
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">COIN</th>
                                <th className="border-bottom col-2" scope="col">FREE</th>
                                <th className="border-bottom col-2" scope="col">LOCKED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances && balances.length
                                    ? balances.map(item => (<WalletRow key={item.symbol} symbol={item.symbol} available={item.available} onOrder={item.onOrder} />))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default Wallet;