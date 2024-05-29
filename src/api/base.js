import axios from 'axios';
import { getAuthToken } from '../context/AuthUtils';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});
