import axiosInstance from './base';

export const login = async (data) => {
  const res = await axiosInstance.post('users/sign_in', data);
  return res.data;
};
export const signUp = async (data) => {
  const res = await axiosInstance.post('users/sign_up', data);
  return res.data;
};
