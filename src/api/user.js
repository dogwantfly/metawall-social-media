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

export const updateProfile = async (data) => {
  const res = await authAxiosInstance.patch('users/profile', data);
  return res.data;
};

export const updatePassword = async (data) => {
  const res = await authAxiosInstance.post('users/updatePassword', data);
  return res.data;
};

export const getLikeList = async () => {
  const res = await authAxiosInstance.get('users/getLikeList');
  return res.data;
};