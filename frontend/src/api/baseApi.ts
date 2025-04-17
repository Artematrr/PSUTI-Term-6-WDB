import axios from 'axios';
import { getToken } from '../utils/localStorage';

const API_URL = import.meta.env.VITE_API_URL;

export const baseApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен аутентификации в заголовок при каждом запросе (axiosInstance)
baseApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
