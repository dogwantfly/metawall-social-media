import { authAxiosInstance } from './base';

export const getPosts = async (order, content) => {
  const res = await authAxiosInstance.get(`/posts?order=${order}&content=${content || ''}`);
  return res.data;
};

export const getPost = async (postId) => {
  const res = await authAxiosInstance.get(`/posts/${postId}`);
  return res.data;
};

export const createPost = async (post) => {
  const res = await authAxiosInstance.post('/posts', post);
  return res.data;
};

export const likePost = async (postId) => {
  const res = await authAxiosInstance.post(`/posts/${postId}/like`);
  return res.data;
};

export const unLikePost = async (postId) => {
  const res = await authAxiosInstance.delete(`/posts/${postId}/unlike`);
  return res.data;
};

export const addComment = async (postId, comment) => {
  const res = await authAxiosInstance.post(`/posts/${postId}/comment`, comment);
  return res.data;
};