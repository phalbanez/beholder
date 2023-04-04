import React, { useState, useEffect } from 'react';
import { getSymbols } from '../../../services/SymbolsService';
import TickerRow from './TickerRow';
import SelectQuote, { filterSymbolNames, getDefaultQuote } from '../../../components/SelectQuote/SelectQuote';
import '../Dashboard.css';

/**
 * props:
 * - data: the market data
 */
function MiniTicker(props) {

    const [symbols, setSymbols] = useState([]);

    const [quote, setQuote] = useState(getDefaultQuote());

    function onQuoteChange(event) {
        setQuote(event.target.value);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        getSymbols(token)
            .then(symbols => setSymbols(filterSymbolNames(symbols, quote)))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
            })
    }, [quote]);

    return (<React.Fragment>
        <div className="col-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
                        </div>
                        <div className="col offset-md-3">
                            <SelectQuote onChange={onQuoteChange} value={quote} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">CLOSE</th>
                                <th className="border-bottom col-2" scope="col">OPEN</th>
                                <th className="border-bottom col-2" scope="col">HIGH</th>
                                <th className="border-bottom col-2" scope="col">LOW</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symbols && symbols.length
                                ? symbols.map(item => (
                                    <TickerRow key={item} symbol={item} data={props.data[item]} />
                                ))
                                : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default MiniTicker;
