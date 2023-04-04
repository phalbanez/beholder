import React from 'react';
import './SmartBadge.css';

/**
 * props:
 * -id
 * - text
 * - onClick
 */
function SmartBadge(props) {
    return (
        <div className="input-group me-2 d-flex flex-row flex-nowrap">
            <span id="spanNoWrap" className="alert alert-info py-1">
                {props.children} {props.text}
            </span>
            <button id={props.id} type="button" className="btn btn-info btn-xs alert" title="Click to Remove" onClick={props.onClick}>X</button>
        </div>
    )
}

export default SmartBadge;