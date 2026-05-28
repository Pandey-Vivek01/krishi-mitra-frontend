import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Fetch Weather by City
export const fetchWeatherByCity = async (city) => {
    const response = await api.get("/weather/fetch", { params: { city } });
    return response.data;
};

// Fetch Weather by Coords
export const fetchWeatherByCoords = async (lat, lon) => {
    const response = await api.get("/weather/fetch", { params: { lat, lon } });
    return response.data;
};

// Auto Recommend Crops
export const autoRecommend = async (location, soilType) => {
    const response = await api.post("/auto-recommend", { location, soilType });
    return response.data;
};