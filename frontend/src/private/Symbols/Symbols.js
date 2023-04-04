import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { searchSymbols, syncSymbols } from '../../services/SymbolsService';
import SymbolModal from './SymbolModal';
import SymbolRow from './SymbolRow';
import Pagination from '../../components/Pagination/Pagination';
import SelectQuote, { getDefaultQuote, setDefaultQuote } from '../../components/SelectQuote/SelectQuote';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import Toast from '../../components/Toast/Toast';

function Symbols() {

    const history = useHistory();

    const defaultLocation = useLocation();

    function getPage(location) {
        if (!location) location = defaultLocation;
        return new URLSearchParams(location.search).get('page') || '1';
    }

    useEffect(() => {
        return history.listen((location) => {
            setPage(getPage(location));
        })
    }, [history])

    const [symbols, setSymbols] = useState([]);

    const [quote, setQuote] = useState(getDefaultQuote());

    const [count, setCount] = useState(0);

    const [page, setPage] = useState(getPage());

    const [notification, setNotification] = useState({});

    const [isSyncing, setIsSyncing] = useState(false);

    const [viewSymbol, setViewSymbol] = useState({
        symbol: '',
        basePrecision: '',
        quotePrecision: '',
        minNotional: '',
        minLotSize: ''
    });

    function onQuoteChange(event) {
        setQuote(event.target.value);
        setDefaultQuote(event.target.value);
    }

    function errorHandling(err) {
        console.error(err.response ? err.response.data : err.message);
        setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
    }

    function loadSymbols(selectedValue) {
        const token = localStorage.getItem('token');
        const search = selectedValue === 'FAVORITES' ? '' : selectedValue;
        const onlyFavorites = selectedValue === 'FAVORITES';
        searchSymbols(search, onlyFavorites, getPage(), token)
            .then(result => {
                setSymbols(result.rows);
                setCount(result.count);
            })
            .catch(err => errorHandling(err))
    }

    useEffect(() => {
        loadSymbols(quote);
    }, [isSyncing, quote, page])

    function onSyncClick(event) {
        const token = localStorage.getItem("token");
        setIsSyncing(true);
        syncSymbols(token)
            .then(response => {
                setNotification({ type: 'success', text: 'Synced successfully!' });
                setIsSyncing(false)
            })
            .catch(err => {
                errorHandling(err)
                setIsSyncing(false);
            })
    }

    function onViewClick(event) {
        const coinpair = event.target.id.replace("view", "");
        const symbol = symbols.find(s => s.symbol === coinpair);
        setViewSymbol({...symbol});
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="row py-4">
                    <div className="col-8">
                        <h2 className="h4">Symbols</h2>
                    </div>
                    <div className="col-2">
                        <SelectQuote onChange={onQuoteChange} value={quote} />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary animate-up-2" type="button" onClick={onSyncClick}>
                            <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {isSyncing ? "Syncing..." : "Sync"}
                        </button>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Symbol</th>
                                <th className="border-gray-200">Base Prec</th>
                                <th className="border-gray-200">Quote Prec</th>
                                <th className="border-gray-200">Min Notional</th>
                                <th className="border-gray-200">Min Lot Size</th>
                                <th className="border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {symbols.map(item => <SymbolRow key={item.symbol} data={item} onClick={onViewClick} />)}
                        </tbody>
                    </table>
                    <Pagination count={count} />
                </div>
                <Footer />
            </main>
            <Toast text={notification.text} type={notification.type} />
            <SymbolModal data={viewSymbol} />
        </React.Fragment>
    );
}

export default Symbols;
