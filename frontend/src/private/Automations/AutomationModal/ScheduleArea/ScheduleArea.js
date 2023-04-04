import React, { useState, useEffect } from 'react';
import DateTime from './DateTime';

/**
 * props:
 * - schedule
 * - onChange
 */
function ScheduleArea(props) {

    const [schedule, setSchedule] = useState('');
    const [isCron, setIsCron] = useState(verifyCron(props.schedule));

    useEffect(() => {
        setSchedule(props.schedule);

        if(!props.schedule) return;
        if(verifyCron(props.schedule))
            setIsCron(true);
        else if(verifyDate(props.schedule))
            setIsCron(false);
    }, [props.schedule])

    function onInputChange(event) {
        props.onChange({ target: { id: 'schedule', value: event.target.value } });
    }

    function onScheduleByClick(event) {
        setSchedule('');
        setIsCron(!isCron);
    }

    function verifyCron(schedule) {
        return /^(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})$/.test(schedule);
    }

    function verifyDate(schedule){
        //yyyy-mm-ddThh:mm:ss.mmmZ
        return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/.test(schedule);
    }

    return (
        <div className="row">
            <div className="col-12 mb-3">
                <div className="form-group">
                    {
                        isCron
                            ? (
                                <React.Fragment>
                                    <label htmlFor="lowerLimit">Schedule by CRON:</label>
                                    <div className="input-group input-group-merge">
                                        <button type="button" onClick={onScheduleByClick} className="btn btn-secondary">
                                            <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                                        </button>
                                        <input className="form-control" id="schedule" type="text" placeholder="* * * * * *" defaultValue={verifyCron(schedule) ? schedule : ''} onChange={onInputChange} />
                                    </div>
                                </React.Fragment>
                            )
                            : (
                                <React.Fragment>
                                    <label htmlFor="upperLimit">Schedule by Date &amp; Time:</label>
                                    <DateTime date={Date.parse(schedule) ? schedule : ''} onChange={onInputChange} onClick={onScheduleByClick} />
                                </React.Fragment>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default ScheduleArea;