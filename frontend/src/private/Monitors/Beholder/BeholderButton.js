import React from 'react';

function BeholderButton() {
    return (
        <button id="btnBeholder" className="btn btn-primary animate-up-2 me-2" data-bs-toggle="modal" data-bs-target="#modalBeholder">
            <img src="/img/favicon/favicon-32x32.png" height="20" width="20" alt="Beholder Logo" />
        </button>
    )
}

export default BeholderButton;