import axios from 'axios';

const API_URL = '/api/users';

export async function getUserById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function createUser(userData) {
  const res = await axios.post(API_URL, userData);
  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get(API_URL);
  return res.data;
}