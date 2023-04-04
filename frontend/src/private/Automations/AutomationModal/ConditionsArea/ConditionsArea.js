import React, { useState, useEffect } from 'react';
import IndexSelect from './IndexSelect';
import VariableInput from './VariableInput';
import SmartBadge from '../../../../components/SmartBadge/SmartBadge';

/**
 * props:
 * - indexes
 * - symbol
 * - conditions
 * - onChange
 */
function ConditionsArea(props) {

    const [conditions, setConditions] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState({
        example: 0
    });

    function btnRemoveCondition(event) {
        const id = event.target.id;
        const pos = conditions.findIndex(c => c.eval === id);
        conditions.splice(pos, 1);
        if (props.onChange) props.onChange({ target: { id: 'conditions', value: conditions.map(c => c.eval).join(' && ') } });

        const conditionIndexes = parseIndexes(conditions);
        props.onChange({ target: { id: 'indexes', value: conditionIndexes } });
    }

    function onKeySelectChange(event) {
        const item = props.indexes.find(k => k.eval === event.target.value);
        if (item) setSelectedIndex(item);
    }

    function parseIndexes(conditionsArr) {
        const indexesStr = conditionsArr.map(condition => {
            const memoryIndexes = condition.eval.split(/[=><!]/)
                .filter(str => str.startsWith('MEMORY'))
                .map(str => str.split('.')[0]);

            return memoryIndexes.join(',');
        })
            .join(',');
        return [
            ...new Set(indexesStr.replaceAll("MEMORY['", "")
                .replaceAll("']", "")
                .replaceAll(".current", "")
                .split(','))
        ].join(',');
    }

    function onAddConditionClick(event) {
        const parsedCondition = parseConditions(event.target.value.eval)[0];
        if (conditions.some(c => c.eval === parsedCondition.eval)) return;

        conditions.push(parsedCondition);
        props.onChange({ target: { id: 'conditions', value: conditions.map(c => c.eval).join(' && ') } });

        const conditionIndexes = parseIndexes(conditions);
        props.onChange({ target: { id: 'indexes', value: conditionIndexes } });
    }

    function parseConditions(conditionsText) {
        if (!conditionsText) return [];

        const split = conditionsText.split('&&');
        return split.map(item => {
            const text = item.replaceAll("MEMORY['", "")
                .replaceAll("']", "")
                .replaceAll("==", "=")
                .replaceAll(".current", "")
                .replaceAll(props.symbol + ':', '')
                .trim();

            return {
                eval: item.trim(),
                text
            }
        })
    }

    useEffect(() => {
        const parsedConditions = parseConditions(props.conditions);
        setConditions(parsedConditions);
    }, [props.conditions])

    useEffect(() => {
        setIndexes(props.indexes);
    }, [props.indexes])

    useEffect(() => {
        setSelectedIndex({ example: 0 });
    }, [props.symbol])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 mb-3">
                    <IndexSelect indexes={indexes} onChange={onKeySelectChange} />
                    <VariableInput indexes={indexes} onAddClick={onAddConditionClick} selectedIndex={selectedIndex} />
                </div>
            </div>
            {
                conditions
                    ? <div className="divScrollBadges">
                        <div className="d-inline-flex flex-row align-content-start">
                            {
                                conditions.map((condition, ix) => (
                                    <SmartBadge key={ix} id={condition.eval} text={condition.text} onClick={btnRemoveCondition} />
                                ))
                            }
                        </div>
                    </div>
                    : <React.Fragment></React.Fragment>
            }
        </React.Fragment>
    )
}

export default ConditionsArea;
