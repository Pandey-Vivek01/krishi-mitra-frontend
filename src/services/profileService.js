import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getProfile = async (token) => {
  const response = await api.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (data, token) => {
  const response = await api.put("/profile/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfileImage = async (formData, token) => {
  const response = await api.put("/profile/update-image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};