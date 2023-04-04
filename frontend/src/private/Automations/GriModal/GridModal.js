import React, { useRef, useState, useEffect } from 'react';
import SelectSymbol from '../../../components/SelectSymbol/SelectSymbol';
import SwitchInput from '../../../components/SwitchInput/SwitchInput';
import { saveGrid } from '../../../services/AutomationsService';
import { getSymbol } from '../../../services/SymbolsService';
import SymbolPrice from '../../../components/SymbolPrice/SymbolPrice';
import WalletSummary from '../../../components/WalletSummary/WalletSummary';
import { getMemoryIndex } from '../../../services/BeholderService';
import GridTable from './GridTable';
import '../Automations.css';
import LogButton from '../../../components/Logs/LogButton';
import LogView from '../../../components/Logs/LogView';
import GridButton from './GridButton';

/**
 * props:
 * - data
 * - onSubmit
 */
function GridModal(props) {

    const [error, setError] = useState('');

    const DEFAULT_AUTOMATION = {
        conditions: '',
        name: '',
        indexes: '',
        actions: []
    }

    const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);

    const DEFAULT_GRID = {
        lowerLimit: '',
        upperLimit: '',
        levels: '',
        quantity: ''
    }
    const [grid, setGrid] = useState(DEFAULT_GRID);

    useEffect(() => {
        if (!props.data) return;
        setAutomation(props.data);

        if (!props.data.id || !props.data.grids || !props.data.grids.length) return setGrid(DEFAULT_GRID);

        const conditionSplit = props.data.conditions.split(' && ');
        if (!conditionSplit || conditionSplit.length < 2) return;

        const quantity = props.data.grids[0].orderTemplate.quantity;
        setGrid({
            lowerLimit: parseFloat(conditionSplit[0].split('>')[1]),
            upperLimit: parseFloat(conditionSplit[1].split('<')[1]),
            levels: props.data.grids.length + 1,
            quantity: quantity === 'MIN_NOTIONAL' ? 'Min. Notional' : quantity
        });
    }, [props.data])

    const [symbol, setSymbol] = useState(false);
    useEffect(() => {
        if (!automation.symbol) return;

        setError('');
        const token = localStorage.getItem('token');
        getSymbol(automation.symbol, token)
            .then(symbol => {
                setSymbol(symbol);

                if (grid.quantity === 'Min. Notional')
                    inputTotal.current.value = `${symbol.minNotional}`;
                else
                    inputTotal.current.value = `${grid.quantity * grid.lowerLimit}`.substring(0, 10);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }, [automation.symbol])

    function onSymbolChange(event) {
        setAutomation({ ...DEFAULT_AUTOMATION, symbol: event.target.value });
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

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {

        const modal = document.getElementById('modalGrid');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setIsVisible(false);
            setGridView(false);
            setAutomation(DEFAULT_AUTOMATION);
            setShowLogs(false);
        })
        modal.addEventListener('shown.bs.modal', (event) => {
            setIsVisible(true);
            setGridView(false);
        })

    }, [])

    const btnClose = useRef('');
    const btnSave = useRef('');
    const inputTotal = useRef('');

    async function onSubmit(event) {
        setError('');
        const token = localStorage.getItem('token');

        automation.name = `GRID ${automation.symbol} #${grid.levels}`;
        automation.actions = [{ type: 'GRID' }];
        automation.indexes = `${automation.symbol}:BOOK`;
        automation.conditions = `MEMORY['${automation.symbol}:BOOK'].current.bestAsk>${grid.lowerLimit} && MEMORY['${automation.symbol}:BOOK'].current.bestBid<${grid.upperLimit}`;

        const quantity = grid.quantity === 'Min. Notional' ? 'MIN_NOTIONAL' : grid.quantity;

        saveGrid(automation.id, automation, grid.levels, quantity, token)
            .then(result => {
                btnClose.current.click();
                if (props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }

    function onAutomationChange(event) {
        setAutomation(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    function onGridChange(event) {
        let value = event.target.value;

        if (value === 'Min. Notional')
            value = 'MIN_NOTIONAL';
        else if (parseFloat(event.target.value.replace(',', '.')) > 0)
            value = parseFloat(event.target.value.replace(',', '.'));

        grid[event.target.id] = value;

        setGrid(prevState => ({ ...prevState, [event.target.id]: value }));

        if (event.target.id === 'quantity' && value < parseFloat(symbol.minLotSize)) {
            setError('Min. Lot Size: ' + symbol.minLotSize);
            btnSave.current.disabled = true;
            return;
        }
        else if (event.target.id === 'quantity' || event.target.id === 'lowerLimit') {
            const notional = grid.lowerLimit * grid.quantity;
            inputTotal.current.value = `${notional}`.substring(0, 10);

            if (notional < parseFloat(symbol.minNotional)) {
                setError('Min. Notional: ' + symbol.minNotional);
                btnSave.current.disabled = true;
                return;
            }
        }

        btnSave.current.disabled = false;
        setError('');
    }

    const [gridView, setGridView] = useState(false)
    function onViewGridsClick(event) {
        if (!gridView) setShowLogs(false);
        setGridView(!gridView);
    }

    const [showLogs, setShowLogs] = useState(false);
    function onLogClick(event) {
        if (!showLogs) setGridView(false);
        setShowLogs(!showLogs);
    }

    return (
        <div className="modal fade" id="modalGrid" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">{props.data.id ? 'Edit ' : 'New '}Grid</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="symbol">Symbol:</label>
                                        <SelectSymbol onChange={onSymbolChange} symbol={automation.symbol} onlyFavorites={false} disabled={!!automation.id} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    {
                                        isVisible && automation.symbol
                                            ? <SymbolPrice symbol={automation.symbol} />
                                            : <React.Fragment></React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            !gridView && !showLogs
                                ? (
                                    <React.Fragment>
                                        <div className="form-group">
                                            <WalletSummary wallet={wallet} />
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="lowerLimit">Lower Limit:</label>
                                                        <input className="form-control" id="lowerLimit" type="number" placeholder="0" value={grid.lowerLimit || ''} onChange={onGridChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="upperLimit">Upper Limit:</label>
                                                        <input className="form-control" id="upperLimit" type="number" placeholder="0" value={grid.upperLimit || ''} onChange={onGridChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="levels">Levels:</label>
                                                        <input className="form-control" id="levels" type="number" placeholder="3" value={grid.levels || ''} onChange={onGridChange} disabled={automation.id > 0} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="quantity">Quantity:</label>
                                                        <input className="form-control" id="quantity" type="text" list="gridQtyList" placeholder={symbol.minLotSize} value={grid.quantity} onChange={onGridChange} />
                                                        <datalist id="gridQtyList">
                                                            <option>Min. Notional</option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="total">Notional Price:</label>
                                                        <input ref={inputTotal} className="form-control" id="total" type="number" placeholder="0" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <SwitchInput id="isActive" text="Is Active?" onChange={onAutomationChange} isChecked={automation.isActive} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <SwitchInput id="logs" text="Enable Logs?" onChange={onAutomationChange} isChecked={automation.logs} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                                : <React.Fragment></React.Fragment>
                        }
                        {
                            gridView && !showLogs
                                ? (
                                    <div className="form-group">
                                        <GridTable data={automation.grids} />
                                    </div>
                                )
                                : <React.Fragment></React.Fragment>
                        }
                        {
                            showLogs
                                ? <LogView file={"A:" + automation.id} />
                                : <React.Fragment></React.Fragment>
                        }
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 py-1 col-9">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <GridButton id={automation.id} onClick={onViewGridsClick} />
                        <LogButton id={automation.id} onClick={onLogClick} />
                        <button ref={btnSave} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GridModal;
