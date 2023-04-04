import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import SearchSymbol from '../../components/SearchSymbol/SearchSymbol';
import NewOrderTemplateButton from './NewOrderTemplateButton';
import OrderTemplateRow from './OrderTemplateRow';
import { getOrderTemplates, deleteOrderTemplate } from '../../services/OrderTemplatesService';
import Pagination from '../../components/Pagination/Pagination';
import OrderTemplateModal, { DEFAULT_ORDER_TEMPLATE } from './OrderTemplateModal/OrderTemplateModal';
import Toast from '../../components/Toast/Toast';

function OrderTemplates() {

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

    const { symbol } = useParams();

    const [search, setSearch] = useState(symbol ? symbol : '');

    const [orderTemplates, setOrderTemplates] = useState([]);

    const [notification, setNotification] = useState([]);

    const [count, setCount] = useState(0);

    const [editOrderTemplate, setEditOrderTemplate] = useState({});

    const [page, setPage] = useState(getPage());

    useEffect(() => {
        const token = localStorage.getItem("token");
        getOrderTemplates(search, page || 1, token)
            .then(result => {
                setOrderTemplates(result.rows ? result.rows : []);
                setCount(result.count);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })

    }, [search, page])

    function onSearchChange(event) {
        setSearch(event.target.value);
    }

    function onEditClick(event) {
        const id = event.target.id.replace('edit', '');
        // eslint-disable-next-line
        const orderTemplate = orderTemplates.find(o => o.id == id);
        setEditOrderTemplate({ ...orderTemplate });
    }

    function onDeleteClick(event) {
        const id = event.target.id.replace('delete', '');
        const token = localStorage.getItem('token');
        deleteOrderTemplate(id, token)
            .then(template => { history.go(0) })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message)
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            });
    }

    function onOrderTemplateSubmit(template) {
        history.go(0);
    }

    function onNewOrderTemplateClick(event) {
        setEditOrderTemplate({ ...DEFAULT_ORDER_TEMPLATE });
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h2 className="h4">Order Templates</h2>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <NewOrderTemplateButton onClick={onNewOrderTemplateClick} />
                        </div>
                        <div className="btn-group ms-2 ms-lg-3">
                            <SearchSymbol onChange={onSearchChange} placeholder={search} />
                        </div>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Symbol</th>
                                <th className="border-gray-200">Name</th>
                                <th className="border-gray-200">Side</th>
                                <th className="border-gray-200">Type</th>
                                <th className="border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderTemplates && orderTemplates.length
                                    ? orderTemplates.map(ot => (<OrderTemplateRow key={ot.id} data={ot} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                    <Pagination count={count} />
                </div>
                <Footer />
            </main>
            <OrderTemplateModal data={editOrderTemplate} onSubmit={onOrderTemplateSubmit} />
            <Toast type={notification.type} text={notification.text} />
        </React.Fragment>
    );
}

export default OrderTemplates;
