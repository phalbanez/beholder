import React, { useRef, useState, useEffect } from 'react';
import SelectSymbol from '../../../components/SelectSymbol/SelectSymbol';
import SwitchInput from '../../../components/SwitchInput/SwitchInput';
import { saveAutomation } from '../../../services/AutomationsService';
import ConditionsArea from './ConditionsArea/ConditionsArea';
import { getIndexes } from '../../../services/BeholderService';
import { getSymbol } from '../../../services/SymbolsService';
import '../Automations.css';
import ActionsArea from './ActionsArea/ActionsArea';
import ScheduleArea from './ScheduleArea/ScheduleArea';
import LogButton from '../../../components/Logs/LogButton';
import LogView from '../../../components/Logs/LogView';

/**
 * props:
 * - data
 * - onSubmit
 */
function AutomationModal(props) {

    const [indexes, setIndexes] = useState([]);
    const [symbol, setSymbol] = useState({});
    const [error, setError] = useState('');

    const DEFAULT_AUTOMATION = {
        name: '',
        symbol: '',
        indexes: [],
        conditions: '',
        schedule: '',
        actions: []
    }

    const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);

    const btnClose = useRef('');
    const btnSave = useRef('');

    function onSubmit(event) {
        const token = localStorage.getItem('token');
        saveAutomation(automation.id, automation, token)
            .then(result => {
                btnClose.current.click();
                if (props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }

    function onInputChange(event) {
        setAutomation(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    useEffect(() => {
        if (!props.data) return;
        setAutomation(props.data);
    }, [props.data])

    useEffect(() => {
        if (!automation || !automation.symbol) return;

        if (automation.symbol.startsWith('*'))
            setSymbol({ base: '*', quote: automation.symbol.replace('*', '') });
        else {
            const token = localStorage.getItem('token');
            getSymbol(automation.symbol, token).then(symbolObj => setSymbol(symbolObj));
        }
    }, [automation.symbol])

    useEffect(() => {
        if (!symbol || !symbol.base) return;

        const token = localStorage.getItem('token');
        getIndexes(token)
            .then(indexes => {
                const isWildcard = symbol.base === '*';
                let filteredIndexes = isWildcard
                    ? indexes.filter(k => k.symbol.endsWith(symbol.quote))
                    : indexes.filter(k => k.symbol === automation.symbol);

                if (isWildcard) {
                    filteredIndexes.forEach(ix => {
                        if (ix.variable.startsWith('WALLET')) {
                            ix.symbol = ix.symbol.replace('*', '');
                            ix.eval = ix.eval.replace('*', '')
                        }
                        else {
                            ix.eval = ix.eval.replace(ix.symbol, automation.symbol);
                            ix.symbol = automation.symbol;
                        }
                    })
                }
                else {

                    const baseWallet = indexes.find(ix => ix.variable === 'WALLET' && symbol.base === ix.symbol);
                    if (baseWallet) filteredIndexes.splice(0, 0, baseWallet);

                    const quoteWallet = indexes.find(ix => ix.variable === 'WALLET' && symbol.quote === ix.symbol.replace('*', ''));
                    if (quoteWallet) filteredIndexes.splice(0, 0, quoteWallet);
                }

                filteredIndexes = filteredIndexes.filter((item, index, self) =>
                    index === self.findIndex(t => t.eval === item.eval)
                )

                setIndexes(filteredIndexes);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }, [symbol])

    const [showLogs, setShowLogs] = useState(false);
    function onLogClick(event) {
        setShowLogs(!showLogs);
    }

    useEffect(() => {
        const modal = document.getElementById('modalAutomation');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setAutomation({ ...DEFAULT_AUTOMATION });
            setShowLogs(false);
            setIndexes([]);
        })
    }, [])

    return (
        <div className="modal fade" id="modalAutomation" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">{props.data.id ? 'Edit ' : 'New '}{props.data.schedule ? 'Scheduled ' : ''}Automation</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="symbol">Symbol:</label>
                                        <SelectSymbol onChange={onInputChange} showAny={true} symbol={automation.symbol} onlyFavorites={false} disabled={automation.id > 0} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="symbol">Name:</label>
                                        <input className="form-control" id="name" type="text" placeholder="My strategy name" value={automation.name} required onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            {
                                !showLogs && automation.schedule
                                    ? <ScheduleArea schedule={automation.schedule} onChange={onInputChange} />
                                    : <React.Fragment></React.Fragment>
                            }
                            {
                                !showLogs
                                    ? (
                                        <React.Fragment>
                                            <ul className="nav nav-tabs" id="tabs" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="conditions-tab" data-bs-toggle="tab" data-bs-target="#conditions" type="button" role="tab" aria-controls="home" aria-selected="true">
                                                        Conditions
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="actions-tab" data-bs-toggle="tab" data-bs-target="#actions" type="button" role="tab" aria-controls="actions" aria-selected="false">
                                                        Actions
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tab-content px-3 mb-3" id="tabContent">
                                                <div className="tab-pane fade show active pt-3" id="conditions" role="tabpanel" aria-labelledby="conditions-tab">
                                                    <ConditionsArea symbol={automation.symbol} conditions={automation.conditions} indexes={indexes} onChange={onInputChange} />
                                                </div>
                                                <div className="tab-pane fade" id="actions" role="tabpanel" aria-labelledby="actions-tab">
                                                    <ActionsArea symbol={automation.symbol} actions={automation.actions} onChange={onInputChange} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <SwitchInput id="isActive" text="Is Active?" onChange={onInputChange} isChecked={automation.isActive} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <SwitchInput id="logs" text="Enable Logs?" onChange={onInputChange} isChecked={automation.logs} />
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                    : <LogView file={"A:" + automation.id} />
                            }

                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <LogButton id={automation.id} onClick={onLogClick} />
                        <button ref={btnSave} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutomationModal;
