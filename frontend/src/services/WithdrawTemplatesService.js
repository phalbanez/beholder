import axios from './BaseService';

const WITHDRAW_TEMPLATES_URL = `${process.env.REACT_APP_API_URL}/withdrawtemplates/`;

export async function getWithdrawTemplates(coin, page, token) {
    const withdrawTemplatesUrl = `${WITHDRAW_TEMPLATES_URL}${coin || ''}?page=${page}`;

    const headers = { 'authorization': token };
    const response = await axios.get(withdrawTemplatesUrl, { headers });
    return response.data;//{count, rows}
}

export async function saveWithdrawTemplate(id, newWithdrawTemplate, token) {
    const headers = { 'authorization': token };
    const regex = /^(\d+([,.]\d+)?)$/;

    if (typeof newWithdrawTemplate.amountMultiplier === 'string' && regex.test(newWithdrawTemplate.amountMultiplier))
        newWithdrawTemplate.amountMultiplier = parseFloat(newWithdrawTemplate.amountMultiplier.replace(',', '.'));

    let response;
    if (id)
        response = await axios.patch(`${WITHDRAW_TEMPLATES_URL}${id}`, newWithdrawTemplate, { headers });
    else
        response = await axios.post(WITHDRAW_TEMPLATES_URL, newWithdrawTemplate, { headers });
    return response.data;
}

export async function deleteWithdrawTemplate(id, token) {
    const headers = { 'authorization': token };
    const response = await axios.delete(`${WITHDRAW_TEMPLATES_URL}${id}`, { headers });
    return response.data;
}