import axiosInstance from './base';

export const getPosts = async (order, content) => {
  const res = await axiosInstance.get(`/posts?order=${order}&content=${content || ''}`);
  return res.data;
};

export const createPost = async (post) => {
  const res = await axiosInstance.post('/posts', post);
  return res.data;
};
