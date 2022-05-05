import React from 'react';
import LogView from './LogView';

/**
 * props:
 * - file
 */
function LogModal(props) {
    return (
        <div className="modal fade" id="modalLogs" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">Log Viewer</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <LogView file={props.file} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogModal;