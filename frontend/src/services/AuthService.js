import axios from './BaseService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function doLogin(email, password) {
    const loginUrl = `${API_URL}/login`;
    const response = await axios.post(loginUrl, { email, password });
    return response.data;
}

export async function doLogout(token) {
    const logoutUrl = `${API_URL}/logout`;
    const headers = { 'authorization': token };
    const response = await axios.post(logoutUrl, {}, { headers });
    return response.data;
}