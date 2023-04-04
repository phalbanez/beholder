import React, { useState, useEffect } from 'react';
import Toast from '../../components/Toast/Toast';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import SelectQuote, { getDefaultQuote } from '../../components/SelectQuote/SelectQuote';
import { getOrdersReport, getDayTradeReport } from '../../services/OrdersService';
import DateFilter from '../../components/DateFilter/DateFilter';
import LineChart from './LineChart';
import Wallet from '../../components/Wallet/Wallet';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import AutomationReport from './AutomationReport';

function Reports() {

    const [filter, setFilter] = useState({});

    const [notification, setNotification] = useState([]);

    const [report, setReport] = useState({});

    useEffect(() => {
        if (!filter || !filter.symbol) return setFilter({ symbol: getDefaultQuote() });

        const token = localStorage.getItem("token");

        let promise;
        if (filter.startDate && filter.startDate.getTime() === filter.endDate.getTime())
            promise = getDayTradeReport(filter.symbol, filter.startDate, token);
        else
            promise = getOrdersReport(filter.symbol, filter.startDate, filter.endDate, token);

        promise
            .then(result => setReport(result))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })

    }, [filter])

    function onQuoteChange(event) {
        setFilter(prevState => ({ ...prevState, symbol: event.target.value }));
    }

    function onDateChange(event) {
        setFilter(prevState => ({ ...prevState, startDate: event.target.value.startDate, endDate: event.target.value.endDate }));
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="row py-4">
                    <div className="col-5">
                        <h2 className="h4">Reports</h2>
                    </div>
                    <div className="col-md-2 mb-2">
                        <SelectQuote onChange={onQuoteChange} noFavorites={true} value={filter.symbol} />
                    </div>
                    <div className="col-md-5 mb-2">
                        <DateFilter onClick={onDateChange} />
                    </div>
                </div>
                <LineChart data={report} />
                <div className="row">
                    <InfoBlock title="Buy Volume" value={report.buyVolume} background="secondary">
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                    </InfoBlock>
                    <InfoBlock title="Sell Volume" value={report.sellVolume} background="success">
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                    </InfoBlock>
                    <InfoBlock title="Orders" value={report.orders} precision={0} background="primary">
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                            <path fillRule="evenodd"
                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                clipRule="evenodd"></path>
                        </svg>
                    </InfoBlock>
                </div>
                <div className="row">
                    <AutomationReport data={report.automations} />
                    <Wallet />
                </div>
                <Footer />
            </main>
            <Toast type={notification.type} text={notification.text} />
        </React.Fragment>
    )
}

export default Reports;