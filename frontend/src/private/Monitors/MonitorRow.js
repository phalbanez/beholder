import React from 'react';

/**
 * props:
 * - data
 * - onEditClick
 * - onStopClick
 * - onStartClick
 * - onLogsClick
 */
function MonitorRow(props) {

    function getActiveClass(isActive) {
        return isActive ? "text-success" : "text-danger";
    }

    function getActiveText(isActive) {
        return isActive ? "RUNNING" : "STOPPED";
    }

    return (
        <tr>
            <td>
                {props.data.type}
            </td>
            <td>
                {props.data.symbol
                    ? props.data.symbol
                    : '*'}
                {props.data.interval
                    ? `_${props.data.interval}`
                    : ''}
            </td>
            <td>
                <span className={getActiveClass(props.data.isActive)}>{getActiveText(props.data.isActive)}</span>
            </td>
            <td>
                {
                    !props.data.isSystemMon
                        ? <button id={"edit" + props.data.id} type="button" className="btn btn-secondary btn-xs ms-2" title="Edit this Monitor" data-bs-toggle="modal" data-bs-target="#modalMonitor" onClick={props.onEditClick}>
                            <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        : <React.Fragment></React.Fragment>
                }
                {
                    props.data.isActive && !props.data.isSystemMon
                        ? <button id={"stop" + props.data.id} type="button" className="btn btn-danger btn-xs ms-2" title="Stop this Monitor" onClick={props.onStopClick}>
                            <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                            </svg>
                        </button>
                        : <React.Fragment></React.Fragment>
                }
                {
                    !props.data.isActive && !props.data.isSystemMon
                        ? <button id={"start" + props.data.id} type="button" className="btn btn-success btn-xs ms-2" title="Start this Monitor" onClick={props.onStartClick}>
                            <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </button>
                        : <React.Fragment></React.Fragment>
                }
                {
                    !props.data.isActive && !props.data.isSystemMon
                        ? <button id={"delete" + props.data.id} type="button" className="btn btn-danger btn-xs ms-2" title="Delete this Monitor" onClick={props.onDeleteClick}>
                            <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        : <React.Fragment></React.Fragment>
                }
                {
                    props.data.isSystemMon
                        ? (
                            <button id={"logs" + props.data.id} type="button" className="btn btn-info btn-xs ms-2" title="Logs from this Monitor" data-bs-toggle="modal" data-bs-target="#modalLogs" onClick={props.onLogsClick}>
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" /><path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg>
                            </button>
                        )
                        : <React.Fragment></React.Fragment>
                }
            </td>
        </tr>
    )
}

export default MonitorRow;
