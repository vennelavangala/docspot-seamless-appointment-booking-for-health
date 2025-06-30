import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ base URL must match backend
});

export default api;
