import axios from 'axios';

const API_URL = '/api/login';

export async function login(username, password) {
  const res = await axios.post(API_URL, {username, password});
  return res.data; // { token, user }
}