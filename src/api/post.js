import axiosInstance from './base';

export const getPosts = async () => {
  const res = await axiosInstance.get('/posts');
  return res.data;
};

export const createPost = async (post) => {
  const res = await axiosInstance.post('/posts', post);
  return res.data;
};
