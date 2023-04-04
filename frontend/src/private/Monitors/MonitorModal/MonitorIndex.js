import React, { useState, useRef, useEffect } from 'react';
import SmartBadge from '../../../components/SmartBadge/SmartBadge';
import { getAnalysisIndexes } from '../../../services/BeholderService';

/**
 * props:
 * - indexes
 * - onChange
 */
function MonitorIndex(props) {

    const btnAddIndex = useRef('');
    const inputPeriod = useRef('');

    const [indexes, setIndexes] = useState([]);
    const [analysis, setAnalysis] = useState({});
    const [selectedIndex, setSelectedIndex] = useState('');

    useEffect(() => {
        setIndexes(props.indexes ? props.indexes.split(',') : []);
    }, [props.indexes])

    useEffect(() => {
        const token = localStorage.getItem('token');
        getAnalysisIndexes(token)
            .then(result => setAnalysis(result))
            .catch(err => console.error(err.response ? err.response.data : err.message));
    }, [])

    function onAddIndexClick(event) {
        if (selectedIndex !== 'NONE' && indexes.indexOf(selectedIndex) === -1) {
            inputPeriod.current.value = inputPeriod.current.value === 'params' ? '' : inputPeriod.current.value.trim();
            const params = inputPeriod.current.value ? '_' + inputPeriod.current.value.split(',').join('_') : '';
            indexes.push(selectedIndex + params);

            setSelectedIndex('NONE');
            inputPeriod.current.value = '';

            setIndexes(indexes);
            if (props.onChange) props.onChange({ target: { id: 'indexes', value: indexes.join(',') } });
        }
    }

    function btnRemoveIndex(event) {
        const id = event.target.id.replace('ix', '');
        const pos = indexes.findIndex(ix => ix === id);
        indexes.splice(pos, 1);
        setIndexes(indexes);
        if (props.onChange) props.onChange({ target: { id: 'indexes', value: indexes.join(',') } });
    }

    function onIndexChange(event) {
        setSelectedIndex(event.target.value);
        if (event.target.value === 'NONE') return;

        const { params } = analysis[event.target.value];
        inputPeriod.current.placeholder = params;
        if (params === 'none')
            inputPeriod.current.className = "d-none";
        else
            inputPeriod.current.className = "form-control";
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="form-group">
                        <label htmlFor="side">Indexes:</label>
                        <div className="input-group input-group-merge">
                            <select id="type" className="form-select" defaultValue="NONE" onChange={onIndexChange}>
                                <option value="NONE">None</option>
                                {
                                    Object.entries(analysis)
                                        .sort((a, b) => {
                                            if (a[0] > b[0]) return 1;
                                            if (a[0] < b[0]) return -1;
                                            return 0;
                                        })
                                        .map(props => (<option key={props[0]} value={props[0]}>{props[1].name}</option>))
                                }
                            </select>
                            <input ref={inputPeriod} id="params" type="text" placeholder="" className="d-none" />
                            <button type="button" className="btn btn-secondary" ref={btnAddIndex} onClick={onAddIndexClick}>
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divScrollBadges">
                <div className="d-inline-flex align-content-start">
                    {
                        indexes.map(ix => (
                            <SmartBadge key={ix} id={"ix" + ix} text={ix} onClick={btnRemoveIndex} />
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default MonitorIndex;
