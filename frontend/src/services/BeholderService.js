import axios from './BaseService';

const BEHOLDER_URL = `${process.env.REACT_APP_API_URL}/beholder/`;

export async function getIndexes(token) {
    const headers = { 'authorization': token };
    const response = await axios.get(BEHOLDER_URL + 'memory/indexes', { headers });
    return response.data;
}

export async function getAnalysisIndexes(token){
    const headers = { 'authorization': token };
    const response = await axios.get(`${BEHOLDER_URL}analysis/`, { headers });
    return response.data;
}

export async function getMemoryIndex(symbol, index, interval, token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${BEHOLDER_URL}memory/${symbol}/${index}/${interval ? interval : ''}`, { headers });
    return response.data;
}

export async function getMemory(token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${BEHOLDER_URL}memory/`, { headers });
    return response.data;
}

export async function getAgenda(token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${BEHOLDER_URL}agenda/`, { headers });
    return response.data;
}

export async function getBrain(token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${BEHOLDER_URL}brain/`, { headers });
    return response.data;
}