import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function doLogin(email, password) {
  const url = `${API_URL}/login`;
  const response = await axios.post(url, { email, password });
  return response.data;
}
export async function doLogout(token) {
  const url = `${API_URL}/logout`;
  const headers = { authorization: token };
  const response = await axios.post(url, {}, { headers });
  return response.data;
}
