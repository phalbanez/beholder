import React from 'react';

function NewOrderButton() {
    return (
        <button id="btnNewOrder" className="btn btn-primary animate-up-2" data-bs-toggle="modal" data-bs-target="#modalOrder">
            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                <path fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"></path>
            </svg>
            New Order
        </button>
    );
}

export default NewOrderButton;