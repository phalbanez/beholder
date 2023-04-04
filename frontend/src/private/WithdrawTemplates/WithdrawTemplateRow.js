import React from 'react';

/**
 * props:
 * - data
 * - onEditClick
 * - onDeleteClick
 * - onRunClick
 */
function WithdrawTemplateRow(props) {

    return (
        <tr>
            <td>
                {props.data.coin}
            </td>
            <td>
                {props.data.name}
            </td>
            <td>
                <span className="fw-normal">{props.data.amount}</span>
            </td>
            <td>
                <button id={"edit" + props.data.id} type="button" className="btn btn-secondary btn-xs ms-2" title="Edit this Template" data-bs-toggle="modal" data-bs-target="#modalWithdrawTemplate" onClick={props.onEditClick}>
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button id={"run" + props.data.id} type="button" className="btn btn-success btn-xs ms-2" title="Withdraw Now" onClick={props.onRunClick}>
                    <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                </button>
                <button id={"delete" + props.data.id} type="button" className="btn btn-danger btn-xs ms-2" title="Delete this Template" onClick={props.onDeleteClick}>
                    <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default WithdrawTemplateRow;
