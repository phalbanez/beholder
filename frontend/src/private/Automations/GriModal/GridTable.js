import React, { useState, useEffect } from 'react';

/**
 * props:
 * - data
 */
function GridTable(props) {

    const [grids, setGrids] = useState([]);

    useEffect(() => {
        if (!props.data || !props.data.length) return;
        setGrids(props.data);
    }, [props.data])

    function getItem(conditions){
        return conditions.split(' && ')[0].split(/[><]/)[1];
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-warning">BUY Levels</li>
                    {
                        grids && grids.length && grids.filter(g => g.orderTemplate.side === 'BUY').map(g => (
                            <li key={g.id} className="list-group-item">{getItem(g.conditions)}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <ul className="list-group">
                <li className="list-group-item list-group-item-success">SELL Levels</li>
                    {
                        grids && grids.length && grids.filter(g => g.orderTemplate.side === 'SELL').map(g => (
                            <li key={g.id} className="list-group-item">{getItem(g.conditions)}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default GridTable;