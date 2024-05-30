import axios from 'axios';
import { getAuthToken } from '../context/AuthUtils';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
