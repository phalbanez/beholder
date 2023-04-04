import React, { useState, useEffect } from 'react';

/**
 * props:
 * - data
 */
function AutomationReport(props) {

    const [automations, setAutomations] = useState([]);

    useEffect(() => {
        if (!props.data) return;
        setAutomations(props.data);
    }, [props.data])

    return (
        <div className="col-md-6 col-sm-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Automations</h2>
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">NAME</th>
                                <th className="border-bottom col-2" scope="col">EXECS</th>
                                <th className="border-bottom col-2" scope="col">NET</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(automations) && automations.map(item => (
                                (
                                    <tr key={item.name}>
                                        <td className="text-gray-900">
                                            {item.name}
                                        </td>
                                        <td className="text-gray-900">
                                            {item.executions}
                                        </td>
                                        <td className="text-gray-900">
                                            {item.net.toFixed(2)}
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AutomationReport;
