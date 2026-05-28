import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Get All Posts
export const getAllPosts = async (params) => {
    const response = await api.get("/posts", { params });
    return response.data;
};

// Get Single Post
export const getPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

// Create Post
export const createPost = async (data, token) => {
    const response = await api.post("/posts/create", data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Update Post
export const updatePost = async (id, data, token) => {
    const response = await api.put(`/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Delete Post
export const deletePost = async (id, token) => {
    const response = await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Toggle Like
export const toggleLike = async (id, token) => {
    const response = await api.post(`/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Add Comment
export const addComment = async (id, data, token) => {
    const response = await api.post(`/posts/${id}/comment`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};