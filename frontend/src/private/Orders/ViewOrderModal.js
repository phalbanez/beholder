import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { cancelOrder, syncOrder } from '../../services/OrdersService';
import { FINISHED_STATUS } from '../../services/ExchangeService';

/**
 * props:
 * - data
 * - onCancel
 */
function ViewOrderModal(props) {

    const DEFAULT_ORDER = {
        symbol: ''
    }

    const history = useHistory();

    const btnClose = useRef('');
    const btnCancel = useRef('');
    const btnSync = useRef('');

    const [order, setOrder] = useState(DEFAULT_ORDER);

    const [error, setError] = useState('');

    const [isSyncing, setIsSyncing] = useState(false);

    function onSyncClick(event) {
        setIsSyncing(true);
    }

    useEffect(() => {
        const modal = document.getElementById('modalViewOrder');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setOrder({ ...DEFAULT_ORDER });
        })
    }, [])

    useEffect(() => {
        if (!isSyncing) return;
        const token = localStorage.getItem('token');
        syncOrder(order.id, token)
            .then(updatedOrder => {
                setIsSyncing(false);
                setOrder(updatedOrder);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
                setIsSyncing(false);
            })
    }, [isSyncing])

    useEffect(() => {
        if (props.data) {
            setOrder(props.data);

            if (btnCancel.current)
                btnCancel.current.disabled = props.data.status !== 'NEW';

            if (btnSync.current)
                btnSync.current.disabled = FINISHED_STATUS.indexOf(props.data.status) !== -1;
        }
    }, [props.data])

    function errorHandling(err) {
        setError(err.response ? err.response.data : err.message);
    }

    function onCancelClick(event) {
        const token = localStorage.getItem('token');
        cancelOrder(order.symbol, order.orderId, token)
            .then(result => {
                btnClose.current.click();
                if (props.onCancel) props.onCancel({ target: { id: 'order', value: order.oderId } });
                return history.push('/orders/' + order.symbol);
            })
            .catch(err => errorHandling(err))
    }

    function getStatusClass(status) {
        switch (status) {
            case 'PARTIALLY_FILLED': return "badge bg-info";
            case 'FILLED': return "badge bg-success";
            case 'REJECTED':
            case 'EXPIRED':
            case 'CANCELED': return "badge bg-danger";
            default: return "badge bg-primary";
        }
    }

    function getDate(timestamp) {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const frm = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
        return frm;
    }

    return (
        <div className="modal fade" id="modalViewOrder" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">Order Details</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Symbol:</b> {order.symbol}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <span className={getStatusClass(order.status)}>{order.status}</span>
                                        {
                                            order.isMaker
                                                ? <span className="badge bg-warning" title="MAKER">M</span>
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Beholder ID:</b> {order.id}
                                    </div>
                                    {
                                        order.automationId
                                            ? (
                                                <div className="col-md-6 mb-3">
                                                    <b>Automation:</b> {order.automation.name}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <b>Binance IDs:</b> {order.orderId} / {order.clientOrderId}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Side:</b> {order.side}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Type:</b> {order.type}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Quantity:</b> {order.quantity}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Unit Price:</b> {order.limitPrice}
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        order.icebergQty
                                            ? (
                                                <div className="col-md-6 mb-3">
                                                    <b>Iceberg Qty:</b> {order.icebergQty}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                    {
                                        order.stopPrice
                                            ? (
                                                <div className="col-md-6 mb-3">
                                                    <b>Stop Price:</b> {order.stopPrice}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                    <div className="col-md-6 mb-3">
                                        <b>Avg Price:</b> {order.avgPrice}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <b>Date:</b> {getDate(order.transactTime)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <b>Commission:</b> {order.commission}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Net:</b> {order.net}
                                    </div>
                                </div>
                                {
                                    order.obs
                                        ? (
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <b>Obs:</b> {order.obs}
                                                </div>
                                            </div>
                                        )
                                        : <React.Fragment></React.Fragment>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                error ?
                                    <div className="alert alert-danger mt-1 col-7 py-1">{error}</div>
                                    : <React.Fragment></React.Fragment>
                            }
                            <button type="button" className="btn btn-sm btn-info" onClick={onSyncClick}>
                                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {isSyncing ? "Syncing..." : "Sync"}
                            </button>
                            <button ref={btnCancel} type="button" className="btn btn-sm btn-danger" onClick={onCancelClick}>
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={onCancelClick}>
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg> Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ViewOrderModal;
