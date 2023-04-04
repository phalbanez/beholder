import React, { useState, useEffect, useRef } from 'react';
import { updateSymbol } from '../../services/SymbolsService';

/**
 * props:
 * - data
 */
function SymbolModal(props) {

    const DEFAULT_SYMBOL = {
        basePrecision: '',
        quotePrecision: '',
        symbol: '',
        minNotional: '',
        minLotSize: '',
        stepSize: '',
        tickSize: ''
    }

    const btnClose = useRef('');
    const [error, setError] = useState('');
    const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);

    useEffect(() => {
        const modal = document.getElementById('modalSymbol');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setSymbol({ ...DEFAULT_SYMBOL });
        })
    }, [])

    useEffect(() => {
        if (!props.data) return;
        setSymbol(props.data);
    }, [props.data])

    function getStarFillColor() {
        return symbol.isFavorite ? "yellow" : "white";
    }

    function onFavoriteClick(event) {
        symbol.isFavorite = !symbol.isFavorite;
        const token = localStorage.getItem('token');
        updateSymbol(symbol, token)
            .then(result => {
                setError('');
                setSymbol({ ...symbol });
            })
            .catch(err => setError(err.response ? err.response.data : err.message));
    }

    return (
        <div className="modal fade" id="modalSymbol" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">View Symbol</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3">
                            <div className="form-group mb-4">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group mb-4">
                                            <label htmlFor="symbol">Symbol</label>
                                            <div className="input-group">
                                                <input className="form-control" id="symbol" type="text" placeholder="BTCUSD" defaultValue={symbol.symbol} required disabled />
                                                <button type="button" className="btn btn-secondary d-inline-flex align-items-center me-2" onClick={onFavoriteClick}>
                                                    <svg className="icon icon-xs" fill={getStarFillColor()} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={onFavoriteClick}>
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Base Precision: </b>{symbol.basePrecision}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Quote Precision: </b>{symbol.quotePrecision}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Min. Notional: </b>{symbol.minNotional}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Min. Lot Size: </b>{symbol.minLotSize}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Tick Size: </b>{symbol.tickSize}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Step Size: </b>{symbol.stepSize}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        error
                            ? <div className="alert alert-danger">{error}</div>
                            : <React.Fragment></React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default SymbolModal;