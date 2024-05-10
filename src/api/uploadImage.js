import axiosInstance from './base';

export const uploadImage = async (formData) => {
  const res = await axiosInstance.post('/api/v1/uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
