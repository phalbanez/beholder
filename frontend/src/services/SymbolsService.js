import axios from './BaseService';

const SYMBOLS_URL = `${process.env.REACT_APP_API_URL}/symbols`;

export async function getSymbols(token) {
    const headers = { 'authorization': token };
    const response = await axios.get(SYMBOLS_URL, { headers });
    return response.data;
}

export async function searchSymbols(search, onlyFavorites, page, token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${SYMBOLS_URL}/?search=${search}&page=${page}&onlyFavorites=${onlyFavorites}`, { headers });
    return response.data;
}

export async function getSymbol(symbol, token) {
    const headers = { 'authorization': token };
    const response = await axios.get(`${SYMBOLS_URL}/${symbol}`, { headers });
    return response.data;
}

export async function updateSymbol(symbolData, token) {
    const headers = { 'authorization': token };
    const response = await axios.patch(`${SYMBOLS_URL}/${symbolData.symbol}`, symbolData, { headers });
    return response.data;
}

export async function syncSymbols(token) {
    const headers = { 'authorization': token };
    const response = await axios.post(`${SYMBOLS_URL}/sync`, {}, { headers });
    return response.data;
}
