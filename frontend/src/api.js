import axios from 'axios';

const API_BASE = 'http://backend:8000';

export function uploadFile(file) {
  const data = new FormData();
  data.append('file', file);
  return axios.post(`${API_BASE}/upload/`, data);
}

export function getExpenses() {
  return axios.get(`${API_BASE}/expenses/`);
}

export function updateExpense(id, expense) {
  return axios.put(`${API_BASE}/expense/${id}/`, expense);
}

export function changeCategory(id, category) {
  return axios.patch(`${API_BASE}/expense/${id}/category/`, null, { params: { category } });
}
