import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import Toast from '../../components/Toast/Toast';
import LogModal from '../../components/Logs/LogModal';

import { getSettings, updateSettings } from '../../services/SettingsService';

function Settings() {

    const confirmPassword = useRef('');
    const [settings, setSettings] = useState({});
    const [notification, setNotification] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        getSettings(token)
            .then(result => setSettings(result))
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })
    }, []);

    function onInputChange(event) {
        setSettings(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    function onFormSubmit(event) {
        if ((settings.password || confirmPassword.current.value)
            && settings.password !== confirmPassword.current.value)
            return setNotification({ type: 'error', text: `The fields New Password and Confirm Password must be equal.` });

        const token = localStorage.getItem("token");
        updateSettings(settings, token)
            .then(result => {
                if (result)
                    setNotification({ type: 'success', text: `Settings saved successfully!` });
                else
                    setNotification({ type: 'error', text: result });
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setNotification({ type: 'error', text: err.response ? err.response.data : err.message });
            })
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Settings</h1>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <button id="btnLogs" className="btn btn-primary animate-up-2 me-2" data-bs-toggle="modal" data-bs-target="#modalLogs">
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" /><path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 mb-4">Personal Settings</h2>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" id="email" type="email" placeholder="name@company.com" defaultValue={settings.email} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="phone">Cellphone</label>
                                        <input className="form-control" id="phone" type="text" placeholder="+1 51 123456789" defaultValue={settings.phone} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div>
                                        <label htmlFor="password">New Password</label>
                                        <input className="form-control" id="password" type="password" placeholder="Enter your new password" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input ref={confirmPassword} className="form-control" id="confirmPassword" type="password" placeholder="Your new password again" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                    <div className="col-sm-3">
                                        <button className="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={onFormSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 my-4">Alert Settings</h2>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="sendGridKey">SendGrid Api Key</label>
                                        <input className="form-control" id="sendGridKey" type="password" placeholder="Enter the SendGrid API Key" defaultValue={settings.sendGridKey} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioPhone">Twilio Phone</label>
                                        <input className="form-control" id="twilioPhone" type="text" placeholder="Enter the Twilio Phone Number" defaultValue={settings.twilioPhone} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioSid">Twilio SID</label>
                                        <input className="form-control" id="twilioSid" type="text" placeholder="Enter the Twilio SID" defaultValue={settings.twilioSid} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioToken">Twilio Token</label>
                                        <input className="form-control" id="twilioToken" type="password" placeholder="Enter the Twilio Token" defaultValue={settings.twilioToken} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="telegramBot">Telegram Bot Token</label>
                                        <input className="form-control" id="telegramBot" type="password" placeholder="Enter the Telegram Bot Token" defaultValue={settings.telegramBot} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="telegramChat">Telegram Chat ID</label>
                                        <input className="form-control" id="telegramChat" type="text" placeholder="Enter the Telegram Chat ID" defaultValue={settings.telegramChat} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                    <div className="col-sm-3">
                                        <button className="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={onFormSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 my-4">Binance Settings</h2>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="apiUrl">API Url</label>
                                        <input className="form-control" id="apiUrl" type="text" placeholder="Enter the API URL" defaultValue={settings.apiUrl} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="apiUrl">Stream Url</label>
                                        <input className="form-control" id="streamUrl" type="text" placeholder="Enter the Stream URL" defaultValue={settings.streamUrl} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="accessKey">Access Key</label>
                                        <input className="form-control" id="accessKey" type="text" placeholder="Enter the API Access Key" defaultValue={settings.accessKey} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="secretKey">New Secret Key</label>
                                        <input className="form-control" id="secretKey" type="password" placeholder="Enter your new API Secret Key" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                    <div className="col-sm-3">
                                        <button className="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={onFormSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
            <Toast text={notification.text} type={notification.type} />
            <LogModal file="system" />
        </React.Fragment >
    );
}

export default Settings;
