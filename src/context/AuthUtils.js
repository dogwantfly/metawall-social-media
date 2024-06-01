import { authAxiosInstance } from '../api/base';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
export const getAuthToken = () => {
  const authToken = getCookie('authToken');

  return authToken;
};
export const getUserName = () => {
  const userName = getCookie('userName');

  return userName;
};
export const getUserEmail = () => {
  const userEmail = getCookie('userEmail');

  return userEmail;
};
export const setAuthToken = (token) => {
  authAxiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};
export const removeAuthToken = () => {
  document.cookie = `authToken=; path=/; expires=${new Date(
    Date.now() - 1000 * 60 * 60 * 24 * 30
  ).toUTCString()}`;
};
