import API from "./api";

export const getPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const getPostComments = (id) => API.get(`/posts/${id}/comments`);
export const addComment = (id, data) => API.post(`/posts/${id}/comments`, data);
export const likePost = (id) => API.post(`/posts/${id}/like`);

export const createPost = (data) =>
  API.post("/posts", data, { headers: { "Content-Type": "multipart/form-data" } });