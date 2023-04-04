import React, { useRef, useState, useEffect } from 'react';
import SelectSymbol from '../../../components/SelectSymbol/SelectSymbol';
import MonitorType from './MonitorType';
import MonitorIndex from './MonitorIndex';
import SwitchInput from '../../../components/SwitchInput/SwitchInput';
import { saveMonitor } from '../../../services/MonitorsService';
import SelectInterval from './SelectInterval';
import LogButton from '../../../components/Logs/LogButton';
import LogView from '../../../components/Logs/LogView';

/**
 * props:
 * - data
 * - onSubmit
 */
function MonitorModal(props) {

    const DEFAULT_MONITOR = {
        id: 0,
        symbol: '',
        type: 'CANDLES',
        broadcastLabel: '',
        interval: '1m',
        indexes: '',
        isActive: false,
        isSystemMon: false,
        logs: false
    }

    const [error, setError] = useState('');

    const [monitor, setMonitor] = useState(DEFAULT_MONITOR);

    const btnClose = useRef('');
    const btnSave = useRef('');

    function onSubmit(event) {
        const token = localStorage.getItem('token');
        saveMonitor(monitor.id, monitor, token)
            .then(result => {
                btnClose.current.click();
                if (props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.message);
            })
    }

    function onInputChange(event) {
        setMonitor(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    useEffect(() => {
        setMonitor(props.data);
    }, [props.data.id])

    const [showLogs, setShowLogs] = useState(false);
    function onLogClick(event) {
        setShowLogs(!showLogs);
    }

    useEffect(() => {
        const modal = document.getElementById('modalMonitor');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setMonitor({ ...DEFAULT_MONITOR });
            setShowLogs(false);
        })
    }, [])

    return (
        <div className="modal fade" id="modalMonitor" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">{props.data.id ? 'Edit ' : 'New '}Monitor</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group mb-4">
                                        <MonitorType onChange={onInputChange} type={monitor.type} />
                                    </div>
                                </div>
                                {
                                    monitor.type === 'CANDLES' || monitor.type === 'TICKER'
                                        ? <div className="col-md-6 mb-3">
                                            <div className="form-group mb-4">
                                                <label htmlFor="symbol">Symbol:</label>
                                                <SelectSymbol onChange={onInputChange} symbol={monitor.symbol} onlyFavorites={false} />
                                            </div>
                                        </div>
                                        : <React.Fragment></React.Fragment>
                                }
                            </div>
                            {
                                showLogs
                                    ? <LogView file={"M:" + monitor.id} />
                                    : (
                                        <React.Fragment>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group mb-4">
                                                        <label htmlFor="symbol">Broadcast Label: <span data-bs-toggle="tooltip" data-bs-placement="top" title="Label to broadcast the info via WebSockets" className="badge bg-warning py-1">?</span></label>
                                                        <input type="text" id="broadcastLabel" className="form-control" onChange={onInputChange} value={monitor.broadcastLabel} placeholder="none" />
                                                    </div>
                                                </div>
                                                {
                                                    monitor.type === 'CANDLES'
                                                        ? <div className="col-md-6 mb-3">
                                                            <div className="form-group mb-4">
                                                                <SelectInterval onChange={onInputChange} interval={monitor.interval} />
                                                            </div>
                                                        </div>
                                                        : <React.Fragment></React.Fragment>
                                                }
                                            </div>
                                            {
                                                monitor.type === 'CANDLES'
                                                    ? <MonitorIndex onChange={onInputChange} indexes={monitor.indexes} />
                                                    : <React.Fragment></React.Fragment>
                                            }
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <SwitchInput id="isActive" text="Is Active?" onChange={onInputChange} isChecked={monitor.isActive} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <SwitchInput id="logs" text="Enable Logs?" onChange={onInputChange} isChecked={monitor.logs} />
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <LogButton id={monitor.id} onClick={onLogClick} />
                        <button ref={btnSave} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonitorModal;
