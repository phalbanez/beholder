import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import WalletRow from './WalletRow';
import { getFullBalance } from '../../services/ExchangeService';
import Toast from '../../components/Toast/Toast';
import NewOrderButton from '../../components/NewOrder/NewOrderButton';
import NewOrderModal from '../../components/NewOrder/NewOrderModal';
import SelectFiat, { setDefaultFiat, getDefaultFiat } from '../../components/SelectFiat/SelectFiat';

function Wallet() {

    const history = useHistory();

    const [balances, setBalances] = useState([]);
    const [total, setTotal] = useState("");
    const [fiat, setFiat] = useState(getDefaultFiat());

    const [notification, setNotification] = useState({ type: '', text: '' });

    useEffect(() => {
        const token = localStorage.getItem("token");
        getFullBalance(fiat, token)
            .then((info) => {
                setTotal(info.fiatEstimate);
                delete info.fiatEstimate;

                const balances = Object.entries(info).map(item => {
                    return {
                        symbol: item[0],
                        available: item[1].available,
                        onOrder: item[1].onOrder,
                        fiatEstimate: item[1].fiatEstimate,
                        avg: item[1].avg
                    }
                })
                    .sort((a, b) => {
                        if (a.symbol > b.symbol) return 1;
                        if (a.symbol < b.symbol) return -1;
                        return 0;
                    });

                setBalances(balances);

            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message)
                setNotification(err.response ? err.response.data : err.message);
            })

    }, [fiat])

    function onOrderSubmit(event) {
        history.go(0);
    }

    function onFiatChange(event) {
        setDefaultFiat(event.target.value);
        setFiat(event.target.value)
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h2 className="h4">Wallet</h2>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <div className="me-2">
                                <SelectFiat onChange={onFiatChange} />
                            </div>
                            <NewOrderButton />
                        </div>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Coin</th>
                                <th className="border-gray-200">Free</th>
                                <th className="border-gray-200">Locked</th>
                                <th className="border-gray-200">Fiat Total</th>
                                <th className="border-gray-200">Avg Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances && balances.length
                                    ? balances.filter(b => parseFloat(b.available) > 0 || parseFloat(b.onOrder) > 0).map(item => (<WalletRow key={item.symbol} data={item} />))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <Footer />
            </main>
            <Toast type={notification.type} text={notification.text} />
            <NewOrderModal onSubmit={onOrderSubmit} />
        </React.Fragment>
    );
}

export default Wallet;
