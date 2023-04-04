import React from 'react';

/**
 * props:
 * - data
 * - onClick
 */
function OrderRow(props) {

    function getDate(timestamp) {
        const date = new Date(timestamp);
        const frm = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date);
        return frm;
    }

    function getStatus(status) {
        let className;
        switch (status) {
            case 'PARTIALLY_FILLED': className = "badge bg-info py-1"; break;
            case 'FILLED': className = "badge bg-success py-1"; break;
            case 'REJECTED':
            case 'EXPIRED':
            case 'CANCELED': className = "badge bg-danger py-1"; break;
            default: className = "badge bg-warning py-1"; break;
        }
        return (<span className={className}>{status.split('_')[0]}</span>);
    }

    return (
        <tr>
            <td>{
                props.data.automationId
                    ? (
                        <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                            </path>
                        </svg>
                    )
                    : (
                        <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clipRule="evenodd" />
                        </svg>
                    )
            }{
                    props.data.side === 'BUY'
                        ? <span className="badge bg-warning py-1 me-2">Buy</span>
                        : <span className="badge bg-warning py-1 me-2">Sell</span>
                }
                {props.data.symbol}
            </td>
            <td><span className="fw-normal">{getDate(props.data.transactTime)}</span></td>
            <td><span className="fw-normal">{props.data.quantity}</span></td>
            <td><span className="fw-bold">{props.data.net}</span></td>
            <td>{getStatus(props.data.status)}</td>
            <td>
                <button id={"view" + props.data.id} type="button" className="btn btn-info btn-xs" data-bs-toggle="modal" data-bs-target="#modalViewOrder" onClick={props.onClick}>
                    <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default OrderRow;
