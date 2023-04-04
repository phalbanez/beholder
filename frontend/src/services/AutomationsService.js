import axios from './BaseService';

const AUTOMATIONS_URL = `${process.env.REACT_APP_API_URL}/automations/`;

export async function getAutomations(page, token) {
    const automationsUrl = `${AUTOMATIONS_URL}?page=${page}`;

    const headers = { 'authorization': token };
    const response = await axios.get(automationsUrl, { headers });
    return response.data;//{count, rows}
}

export async function getAutomation(id, token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${AUTOMATIONS_URL}${id}`, { headers });
    return response.data;
}

export async function saveAutomation(id, newAutomation, token) {
    const headers = { 'authorization': token };
    let response;
    if (id)
        response = await axios.patch(`${AUTOMATIONS_URL}${id}`, newAutomation, { headers });
    else
        response = await axios.post(AUTOMATIONS_URL, newAutomation, { headers });
    return response.data;
}

export async function saveGrid(id, newAutomation, levels, quantity, token) {
    const headers = { 'authorization': token };
    let response;
    if (id)
        response = await axios.patch(`${AUTOMATIONS_URL}${id}?levels=${levels}&quantity=${quantity}`, newAutomation, { headers });
    else
        response = await axios.post(`${AUTOMATIONS_URL}?levels=${levels}&quantity=${quantity}`, newAutomation, { headers });
    return response.data;
}

export async function deleteAutomation(id, token) {
    const headers = { 'authorization': token };
    const response = await axios.delete(`${AUTOMATIONS_URL}${id}`, { headers });
    return response.data;
}

export async function startAutomation(id, token) {
    const headers = { 'authorization': token };
    const response = await axios.post(`${AUTOMATIONS_URL}${id}/start`, {}, { headers });
    return response.data;
}

export async function stopAutomation(id, token) {
    const headers = { 'authorization': token };
    const response = await axios.post(`${AUTOMATIONS_URL}${id}/stop`, {}, { headers });
    return response.data;
}