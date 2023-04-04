import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import NewWithdrawTemplateButton from './NewWithdrawTemplateButton';
import WithdrawTemplateRow from './WithdrawTemplateRow';
import Pagination from '../../components/Pagination/Pagination';
import WithdrawTemplateModal, { DEFAULT_WITHDRAW_TEMPLATE } from './WithdrawTemplateModal/WithdrawTemplateModal';
import Toast from '../../components/Toast/Toast';
import { getWithdrawTemplates, deleteWithdrawTemplate } from '../../services/WithdrawTemplatesService';
import { doWithdraw } from '../../services/ExchangeService';

function WithdrawTemplates() {

    useEffect(() => {
        if (window.location.href.indexOf('localhost') !== -1)
            setNotification({ type: 'info', text: 'These features only work in production.' });
    }, [])

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

    const [withdrawTemplates, setWithdrawTemplates] = useState([]);

    const [notification, setNotification] = useState([]);

    const [count, setCount] = useState(0);

    const [editWithdrawTemplate, setEditWithdrawTemplate] = useState({});

    const [page, setPage] = useState(getPage());

    useEffect(() => {
        const token = localStorage.getItem("token");
        getWithdrawTemplates('', page || 1, token)
            .then(result => {
                setWithdrawTemplates(result.rows ? result.rows : []);
                setCount(result.count);
                setEditWithdrawTemplate(result.rows && result.rows.length > 0 ? result.rows[0] : {});
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })

    }, [page])

    function onEditClick(event) {
        const id = event.target.id.replace('edit', '');
        // eslint-disable-next-line
        const template = withdrawTemplates.find(o => o.id == id);
        setEditWithdrawTemplate({...template});
    }

    function onDeleteClick(event) {
        const id = event.target.id.replace('delete', '');
        const token = localStorage.getItem('token');
        deleteWithdrawTemplate(id, token)
            .then(result => history.go(0))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })
    }

    function onRunClick(event) {
        const id = event.target.id.replace('run', '');
        const token = localStorage.getItem('token');
        doWithdraw(id, token)
            .then(result => setNotification({ type: 'success', text: `Withdrawal #${result.id} successful!` }))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })
    }

    function onWithdrawTemplateSubmit(template) {
        history.go(0);
    }

    function onNewWithdrawTemplateClick(event) {
        setEditWithdrawTemplate(DEFAULT_WITHDRAW_TEMPLATE);
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h2 className="h4">Withdraw Templates</h2>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <NewWithdrawTemplateButton onClick={onNewWithdrawTemplateClick} />
                        </div>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Coin</th>
                                <th className="border-gray-200">Name</th>
                                <th className="border-gray-200">Amount</th>
                                <th className="border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                withdrawTemplates && withdrawTemplates.length
                                    ? withdrawTemplates.map(ot => (<WithdrawTemplateRow key={ot.id} data={ot} onEditClick={onEditClick} onDeleteClick={onDeleteClick} onRunClick={onRunClick} />))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                    <Pagination count={count} />
                </div>
                <Footer />
            </main>
            <WithdrawTemplateModal data={editWithdrawTemplate} onSubmit={onWithdrawTemplateSubmit} />
            <Toast type={notification.type} text={notification.text} />
        </React.Fragment>
    );
}

export default WithdrawTemplates;
