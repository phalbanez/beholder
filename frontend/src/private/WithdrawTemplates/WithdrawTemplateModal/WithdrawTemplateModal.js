import React, { useRef, useState, useEffect } from 'react';
import SelectCoin from '../../../components/SelectCoin/SelectCoin';
import SelectNetwork from './SelectNetwork';
import AmountTemplate from './AmountTemplate';
import { saveWithdrawTemplate } from '../../../services/WithdrawTemplatesService';

export const DEFAULT_WITHDRAW_TEMPLATE = {
    name: '',
    coin: '',
    network: '',
    address: '',
    addressTag: '',
    amount: '',
    amountMultiplier: 1
}

/**
 * props:
 * - data
 * - onSubmit
 */
function WithdrawTemplateModal(props) {

    const [error, setError] = useState('');

    const [withdrawTemplate, setWithdrawTemplate] = useState(DEFAULT_WITHDRAW_TEMPLATE);

    const btnClose = useRef('');
    const btnSave = useRef('');

    useEffect(() => {
        const modal = document.getElementById('modalWithdrawTemplate');
        modal.addEventListener('hidden.bs.modal', (event) => {
            setWithdrawTemplate({ ...DEFAULT_WITHDRAW_TEMPLATE });
        })
    }, [])

    useEffect(() => {
        setError('');
        setWithdrawTemplate(props.data);
    }, [props.data])

    function onSubmit(event) {
        const token = localStorage.getItem('token');
        saveWithdrawTemplate(withdrawTemplate.id, withdrawTemplate, token)
            .then(result => {
                btnClose.current.click();
                if (props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }

    function onInputChange(event) {
        setWithdrawTemplate(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    useEffect(() => {
        setError('');
        setWithdrawTemplate(props.data);
    }, [props.data])

    const COINS_WITH_TAG = ["XRP"];

    return (
        <div className="modal fade" id="modalWithdrawTemplate" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">{withdrawTemplate.id ? "Edit" : "New"} Withdraw Template</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="coin">Coin:</label>
                                        <SelectCoin coin={withdrawTemplate.coin} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="network">Network:</label>
                                        <SelectNetwork network={withdrawTemplate.network} coin={withdrawTemplate.coin} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" value={withdrawTemplate.name} className="form-control" placeholder="My template name" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="address">Wallet Address:</label>
                                        <input type="text" id="address" value={withdrawTemplate.address} className="form-control" placeholder="..." onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            {
                                COINS_WITH_TAG.includes(withdrawTemplate.coin)
                                    ? (
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="addressTag">Address Tag:</label>
                                                    <input type="text" id="addressTag" value={withdrawTemplate.addressTag} className="form-control" placeholder="..." onChange={onInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    : <React.Fragment></React.Fragment>
                            }
                            <div className="row">
                                <div className="col-md-7 mb-3">
                                    <AmountTemplate amount={withdrawTemplate.amount} multiplier={withdrawTemplate.amountMultiplier} onChange={onInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <button ref={btnSave} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawTemplateModal;
