import React, { useEffect, useState } from 'react';

/**
 * props:
 * - id
 * - data
 */
function BeholderTab(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!props.data) return;

        let arr = [];
        if (Array.isArray(props.data)) {
            arr = props.data.map((obj, ix) => {
                return {
                    key: ix,
                    value: obj
                }
            })
        }
        else {
            arr = Object.entries(props.data).map(prop => {
                return {
                    key: prop[0],
                    value: prop[1]
                }
            })
        }

        arr.sort((a, b) => {
            if (a.key > b.key) return 1;
            if (a.key < b.key) return -1;
            return 0;
        })

        setData(arr);

    }, [props.data])

    return (
        <div className="table-responsive divScrollBeholder">
            <table className="table table-flush table-sm table-hover">
                <thead>
                    <tr>
                        <th className="border-gray-200">Key</th>
                        <th className="border-gray-200">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(obj => (
                            <tr key={props.id + obj.key}>
                                <td>{obj.key}</td>
                                <td>{JSON.stringify(obj.value)}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BeholderTab;