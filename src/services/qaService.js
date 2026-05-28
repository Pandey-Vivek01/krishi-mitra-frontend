import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Get All Questions
export const getAllQuestions = async (params) => {
    const response = await api.get("/qa", { params });
    return response.data;
};

// Get Single Question
export const getQuestionById = async (id) => {
    const response = await api.get(`/qa/${id}`);
    return response.data;
};

// Ask Question
export const askQuestion = async (data, token) => {
    const response = await api.post("/qa/ask", data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Answer Question
export const answerQuestion = async (id, answer, token) => {
    const response = await api.post(`/qa/${id}/answer`, { answer }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Delete Question
export const deleteQuestion = async (id, token) => {
    const response = await api.delete(`/qa/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Toggle Like
export const toggleLike = async (id, token) => {
    const response = await api.post(`/qa/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};