import { authAxiosInstance } from './base';

export const uploadImage = async (formData) => {
  const res = await authAxiosInstance.post('/api/v1/uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
