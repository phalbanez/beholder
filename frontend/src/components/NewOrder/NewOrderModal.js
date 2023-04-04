import React, { useRef, useState, useEffect } from 'react';
import SelectSymbol from '../SelectSymbol/SelectSymbol';
import SymbolPrice from '../SymbolPrice/SymbolPrice';
import WalletSummary from '../WalletSummary/WalletSummary';
import SelectSide from './SelectSide';
import OrderType from './OrderType';
import QuantityInput from './QuantityInput';
import { getSymbol } from '../../services/SymbolsService';
import { STOP_TYPES } from '../../services/ExchangeService';
import { placeOrder } from '../../services/OrdersService';
import { getMemoryIndex } from '../../services/BeholderService';

/**
 * props:
 * - onSubmit
 */
function NewOrderModal(props) {

    const [error, setError] = useState('');

    const DEFAULT_ORDER = {
        symbol: "",
        limitPrice: "0",
        stopPrice: "0",
        quantity: "0",
        icebergQty: "0",
        side: "BUY",
        type: "LIMIT"
    }

    const [symbol, setSymbol] = useState({});

    const [order, setOrder] = useState(DEFAULT_ORDER);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const modal = document.getElementById('modalOrder');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setIsVisible(false);
            setOrder({ ...DEFAULT_ORDER });
        })
        modal.addEventListener('shown.bs.modal', (event) => {
            setIsVisible(true);
        })

    }, [])

    const btnClose = useRef('');
    const btnSend = useRef('');
    const inputTotal = useRef('');

    function onSubmit(event) {
        const token = localStorage.getItem('token');
        placeOrder(order, token)
            .then(result => {
                btnClose.current.click();
                if (result.id && props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }

    function onInputChange(event) {
        setOrder(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    useEffect(() => {
        setError('');
        btnSend.current.disabled = false;

        const quantity = parseFloat(order.quantity);

        if (quantity && quantity < parseFloat(symbol.minLotSize)) {
            btnSend.current.disabled = true;
            return setError('Min Lot Size ' + symbol.minLotSize);
        }

        if (!quantity) return;

        const price = parseFloat(order.limitPrice);
        if (!price) return;

        const total = quantity * price;
        inputTotal.current.value = `${total}`.substring(0, 8);

        const minNotional = parseFloat(symbol.minNotional);
        if (total < minNotional) {
            btnSend.current.disabled = true;
            return setError('Min Notional: ' + symbol.minNotional);
        }

    }, [order.limitPrice, order.quantity, order.icebergQty])

    useEffect(() => {
        if (!order.symbol) return;
        const token = localStorage.getItem('token');
        getSymbol(order.symbol, token)
            .then(symbol => setSymbol(symbol))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                return setError(err.response ? err.response.data : err.message);
            })
    }, [order.symbol])

    function getPriceClasses(orderType) {
        return ['MARKET', 'STOP_LOSS', 'TAKE_PROFIT', 'TRAILING_STOP'].includes(orderType) ? "col-md-6 mb-3 d-none" : "col-md-6 mb-3";
    }

    function getIcebergClasses(orderType) {
        return orderType === 'ICEBERG' ? "col-md-6 mb-3" : "col-md-6 mb-3 d-none";
    }

    function getStopPriceClasses(orderType) {
        return STOP_TYPES.indexOf(orderType) !== -1 ? "col-md-6 mb-3" : "col-md-6 mb-3 d-none";
    }
    function getTrailingStopClasses(orderType) {
        return orderType === 'TRAILING_STOP' ? 'row' : 'd-none';
    }

    function onPriceChange(book) {
        if (!['MARKET', 'STOP_LOSS', 'TAKE_PROFIT', 'TRAILING_STOP'].includes(order.type) || !btnSend.current) return;

        const quantity = parseFloat(order.quantity);
        if (quantity) {

            btnSend.current.disabled = false;

            if (order.side === 'BUY')
                inputTotal.current.value = `${quantity * parseFloat(book.ask)}`.substring(0, 8);
            else
                inputTotal.current.value = `${quantity * parseFloat(book.bid)}`.substring(0, 8);

            if (parseFloat(inputTotal.current.value) < parseFloat(symbol.minNotional)) {
                btnSend.current.disabled = true;
                return setError('Min Notional: ' + symbol.minNotional);
            }
        }

        //se quiser deixar o activation price automático, descomente essa linha
        //setOrder(prevState => ({ ...prevState, limitPrice: parseFloat(book.bid) }));
    }

    const [wallet, setWallet] = useState({ base: { symbol: '', qty: 0 }, quote: { symbol: '', qty: 0 } });

    async function loadWallet(symbol) {
        const token = localStorage.getItem('token');

        try {
            const baseQty = await getMemoryIndex(symbol.base, 'WALLET', null, token);
            const quoteQty = await getMemoryIndex(symbol.quote, 'WALLET', null, token);
            setWallet({ base: { qty: baseQty, symbol: symbol.base }, quote: { qty: quoteQty, symbol: symbol.quote } });
        } catch (err) {
            console.log(err => err.response ? err.response.data : err.message);
            setError(err.message);
        }
    }

    useEffect(() => {
        if (!symbol || !symbol.base) return;
        loadWallet(symbol);
    }, [symbol])

    function onSymbolChange(event) {
        setOrder({ ...DEFAULT_ORDER, symbol: event.target.value });
    }

    return (
        <div className="modal fade" id="modalOrder" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">New Order</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="symbol">Symbol</label>
                                        <SelectSymbol onChange={onSymbolChange} symbol={order.symbol} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    {
                                        isVisible && order.symbol
                                            ? <SymbolPrice symbol={order.symbol} onChange={onPriceChange} />
                                            : <React.Fragment></React.Fragment>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <label>You have:</label>
                            </div>
                            <WalletSummary wallet={wallet} />
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <SelectSide side={order.side} onChange={onInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <OrderType type={order.type} onChange={onInputChange} />
                                </div>
                            </div>

                            <div className={getTrailingStopClasses(order.type)}>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="limitPrice">Activation Price:</label>
                                    <input id="limitPrice" type="number" className="form-control" placeholder="0" onChange={onInputChange} value={order.limitPrice} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="stopPriceMultiplier">Callback Rate:</label>
                                    <div className="input-group">
                                        <input id="stopPriceMultiplier" type="number" className="form-control" placeholder="1" onChange={onInputChange} value={order.stopPriceMultiplier} />
                                        <span className="input-group-text bg-secondary">
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className={getPriceClasses(order.type)}>
                                    <div className="form-group">
                                        <label htmlFor="limitPrice">Unit Price:</label>
                                        <input type="number" className="form-control" id="limitPrice" placeholder="0" onChange={onInputChange} value={order.limitPrice} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <QuantityInput id="quantity" text="Quantity:" side={order.side} symbol={symbol} wallet={wallet} price={order.limitPrice} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className={getIcebergClasses(order.type)}>
                                    <QuantityInput id="icebergQty" text="Iceberg Qty:" side={order.side} symbol={symbol} wallet={wallet} price={order.limitPrice} onChange={onInputChange} />
                                </div>
                                <div className={getStopPriceClasses(order.type)}>
                                    <div className="form-group">
                                        <label htmlFor="stopPrice">Stop Price:</label>
                                        <input className="form-control" id="stopPrice" type="number" onChange={onInputChange} value={order.stopPrice} placeholder={order.stopPrice} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="total">Total Price:</label>
                                        <input ref={inputTotal} className="form-control" id="total" type="number" placeholder="0" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <button ref={btnSend} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrderModal;
