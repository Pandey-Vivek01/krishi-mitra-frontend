import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Get All Crops
export const getAllCrops = async (params) => {
    const response = await api.get("/crop", { params });
    return response.data;
};

// Add Crop
export const addCrop = async (data, token) => {
    const response = await api.post("/crop/add", data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Update Crop
export const updateCrop = async (id, data, token) => {
    const response = await api.put(`/crop/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Delete Crop
export const deleteCrop = async (id, token) => {
    const response = await api.delete(`/crop/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};