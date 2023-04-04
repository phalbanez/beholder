import React from 'react';

/**
 * props:
 * - onClick
 */
function NewAutomationButton(props) {
    return (
        <React.Fragment>
            <button id="btnNewAutomation" className="btn btn-primary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                    </path>
                </svg>
                New Automation
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a id="linkRegular" className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalAutomation" onClick={props.onClick}>Regular</a></li>
                <li><a id="linkGrid" className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalGrid" onClick={props.onClick}>Grid</a></li>
                <li><a id="linkSchedule" className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalAutomation" onClick={props.onClick}>Schedule</a></li>
            </ul>
        </React.Fragment>
    )
}

export default NewAutomationButton;