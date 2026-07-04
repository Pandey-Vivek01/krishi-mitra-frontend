import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getPricesByCrop = async (crop, token) => {
  const res = await axios.get(
    `${BASE_URL}/mandi/crop/${crop}`,
    getAuthHeader(token)
  );
  return res.data;
};

export const getPricesByState = async (crop, state, token) => {
  const res = await axios.get(
    `${BASE_URL}/mandi/state?crop=${crop}&state=${state}`,
    getAuthHeader(token)
  );
  return res.data;
};