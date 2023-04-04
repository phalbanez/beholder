import React, { useState, useEffect } from 'react';

/**
 * props:
 * - data
 * - onChange
 */
function TrailingTemplate(props) {

    const [orderTemplate, setOrderTemplate] = useState({});

    useEffect(() => {
        if (!props.data) return;
        setOrderTemplate(props.data);
    }, [props.data])

    return (
        <div className="row">
            <div className="col-md-4 mb-3">
                <label htmlFor="limitPrice">Activation Price:</label>
                <input id="limitPrice" type="number" className="form-control" value={orderTemplate.limitPrice || ""} placeholder="0" onChange={props.onChange} />
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="stopPriceMultiplier">Callback Rate:</label>
                <div className="input-group">
                    <input id="stopPriceMultiplier" type="number" className="form-control" value={orderTemplate.stopPriceMultiplier || ""} placeholder="1" onChange={props.onChange} />
                    <span className="input-group-text bg-secondary">
                        %
                    </span>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="stopPrice">Current Stop:</label>
                <input id="stopPrice" type="number" className="form-control" value={orderTemplate.stopPrice || ""} placeholder="0" disabled={true} />
            </div>
        </div>
    )
}

export default TrailingTemplate;