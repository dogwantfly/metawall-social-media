import axiosInstance from './base';

export const login = async (data) => {
  const res = await axiosInstance.post('users/login', data);
  return res.data;
};
