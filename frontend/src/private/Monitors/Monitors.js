import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import MonitorRow from './MonitorRow';
import { getMonitors, startMonitor, stopMonitor, deleteMonitor } from '../../services/MonitorsService';
import Pagination from '../../components/Pagination/Pagination';
import MonitorModal from './MonitorModal/MonitorModal';
import Toast from '../../components/Toast/Toast';
import LogModal from '../../components/Logs/LogModal';
import NewMonitorButton from './NewMonitorButton';
import BeholderButton from './Beholder/BeholderButton';
import BeholderModal from './Beholder/BeholderModal';

function Monitors() {

    const defaultLocation = useLocation();

    function getPage(location) {
        if (!location) location = defaultLocation;
        return new URLSearchParams(location.search).get('page');
    }

    const history = useHistory();

    useEffect(() => {
        return history.listen((location) => {
            setPage(getPage(location));
        })
    }, [history])

    const [monitors, setMonitors] = useState([]);

    const [count, setCount] = useState(0);

    const [notification, setNotification] = useState({ type: '', text: '' });

    const DEFAULT_MONITOR = {
        type: "CANDLES",
        interval: "1m",
        isActive: false,
        logs: false
    }

    const [editMonitor, setEditMonitor] = useState(DEFAULT_MONITOR);

    const [page, setPage] = useState(getPage());

    useEffect(() => {
        const token = localStorage.getItem("token");
        getMonitors(page || 1, token)
            .then(result => {
                setMonitors(result.rows);
                setCount(result.count);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            });

    }, [page])

    function onEditClick(event) {
        const id = event.target.id.replace('edit', '');
        const monitor = monitors.find(m => m.id == id);
        setEditMonitor({ ...monitor });
    }

    function onLogsClick(event) {
        const id = event.target.id.replace('logs', '');
        setEditMonitor(monitors.find(m => m.id == id));
    }

    function onStopClick(event) {
        const id = event.target.id.replace('stop', '');
        const token = localStorage.getItem('token');
        stopMonitor(id, token)
            .then(monitor => { history.go(0) })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            });
    }

    function onStartClick(event) {
        const id = event.target.id.replace('start', '');
        const token = localStorage.getItem('token');
        startMonitor(id, token)
            .then(monitor => { history.go(0) })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message)
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            });
    }

    function onDeleteClick(event) {
        const id = event.target.id.replace('delete', '');
        const token = localStorage.getItem('token');
        deleteMonitor(id, token)
            .then(monitor => { history.go(0) })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            });
    }

    function onMonitorSubmit(order) {
        history.go(0);
    }

    function onNewMonitorClick(event) {
        setEditMonitor(DEFAULT_MONITOR);
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h2 className="h4">Monitors</h2>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <BeholderButton />
                            <NewMonitorButton onClick={onNewMonitorClick} />
                        </div>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Type</th>
                                <th className="border-gray-200">Symbol</th>
                                <th className="border-gray-200">Active</th>
                                <th className="border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                monitors && monitors.length
                                    ? monitors.map(monitor => (<MonitorRow key={monitor.id} data={monitor} onEditClick={onEditClick} onStartClick={onStartClick} onStopClick={onStopClick} onDeleteClick={onDeleteClick} onLogsClick={onLogsClick} />))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                    <Pagination count={count} />
                </div>
                <Footer />
            </main>
            <MonitorModal data={editMonitor} onSubmit={onMonitorSubmit} />
            <LogModal file={editMonitor.id > 0 ? "M:" + editMonitor.id : ""} />
            <BeholderModal />
            <Toast type={notification.type} text={notification.text} />
        </React.Fragment>
    );
}

export default Monitors;
