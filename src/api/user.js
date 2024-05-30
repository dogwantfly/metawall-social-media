import { axiosInstance }from './base';
import { authAxiosInstance } from './base';

export const login = async (data) => {
  const res = await axiosInstance.post('users/sign_in', data);
  return res.data;
};
export const signUp = async (data) => {
  const res = await axiosInstance.post('users/sign_up', data);
  return res.data;
}; 

export const getUserInfo = async () => {
  const res = await authAxiosInstance.get('users/profile');
  return res.data;
};

export const getUserFollowing = async () => {
  const res = await authAxiosInstance.get('users/following');
  return res.data;
};