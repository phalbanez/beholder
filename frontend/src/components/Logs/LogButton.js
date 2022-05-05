import React, { useState } from 'react';

/**
 * props:
 * - id
 * - onClick
 */
function LogButton(props) {

    const [isVisible, setIsVisible] = useState(false);

    function onClick(event) {
        setIsVisible(!isVisible);
        props.onClick(event);
    }

    return (
        <React.Fragment>
            {
                props.id > 0
                    ? (
                        <button id="btnViewLog" type="button" className="btn btn-secondary btn-sm" onClick={onClick}>
                            {
                                isVisible
                                    ? (
                                        <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
                                    )
                                    : (
                                        <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" /><path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg>
                                    )
                            }
                        </button>
                    )
                    : <React.Fragment></React.Fragment>
            }
        </React.Fragment >
    )
}

export default LogButton;