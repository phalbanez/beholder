import React, { useEffect, useState } from 'react';
import { getLogs } from '../../services/LogsService';

/**
 * props:
 * - file
 */
function LogView(props) {

    const [logs, setLogs] = useState('');

    useEffect(() => {
        if (!props.file) return;
        const token = localStorage.getItem('token');
        getLogs(props.file, token)
            .then(logs => setLogs(logs))
            .catch(err => setLogs(err.response ? err.response.data : err.message));
    }, [props.file])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="form-group">
                        <label htmlFor="logs">Logs:</label>
                        <textarea id="logs" defaultValue={logs} className="form-control" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LogView;