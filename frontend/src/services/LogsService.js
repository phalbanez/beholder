import axios from './BaseService';

const LOGS_URL = `${process.env.REACT_APP_API_URL}/logs/`;

export async function getLogs(file, token) {
    const headers = { 'authorization': token };
    const response = await axios.get(LOGS_URL + file, { headers });
    return response.data;
}
