import React, { useState, useEffect } from 'react';
import LogView from '../../../components/Logs/LogView';
import { getAgenda, getBrain, getMemory } from '../../../services/BeholderService';
import BeholderTab from './BeholderTab';

function BeholderModal() {

    const [memory, setMemory] = useState({});
    const [brain, setBrain] = useState({});
    const [agenda, setAgenda] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        getMemory(token)
            .then(memory => setMemory(memory))
            .catch(err => setMemory({ error: err.response ? err.response.data : err.message }));

        getBrain(token)
            .then(brain => setBrain(brain))
            .catch(err => setBrain({ error: err.response ? err.response.data : err.message }));

        getAgenda(token)
            .then(agenda => setAgenda(agenda))
            .catch(err => setAgenda({ error: err.response ? err.response.data : err.message }));
    }, [])

    return (
        <div className="modal fade" id="modalBeholder" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">Beholder</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <ul className="nav nav-tabs" id="tabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="memory-tab" data-bs-toggle="tab" data-bs-target="#memory" type="button" role="tab">
                                        Memory
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="brain-tab" data-bs-toggle="tab" data-bs-target="#brain" type="button" role="tab">
                                        Brain
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="agenda-tab" data-bs-toggle="tab" data-bs-target="#agenda" type="button" role="tab">
                                        Agenda
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="logs-tab" data-bs-toggle="tab" data-bs-target="#logsTab" type="button" role="tab">
                                        Logs
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content px-3 mb-3" id="tabContent">
                                <div className="tab-pane fade show active" id="memory" role="tabpanel">
                                    <BeholderTab id="me" data={memory} />
                                </div>
                                <div className="tab-pane fade" id="brain" role="tabpanel">
                                    <BeholderTab id="br" data={brain} />
                                </div>
                                <div className="tab-pane fade" id="agenda" role="tabpanel">
                                    <BeholderTab id="ag" data={agenda} />
                                </div>
                                <div className="tab-pane fade pt-3" id="logsTab" role="tabpanel">
                                    <LogView file="beholder" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeholderModal;