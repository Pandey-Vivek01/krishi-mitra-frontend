import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ─── Product APIs ───────────────────────────────────────

export const getAllProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${BASE_URL}/products?${params}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const getMyProducts = async (token) => {
  const res = await axios.get(`${BASE_URL}/products/my/listings`, getAuthHeader(token));
  return res.data;
};

export const createProduct = async (formData, token) => {
  const res = await axios.post(`${BASE_URL}/products/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      //"Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id, data, token) => {
  const res = await axios.put(`${BASE_URL}/products/update/${id}`, data, getAuthHeader(token));
  return res.data;
};

export const deleteProduct = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/products/delete/${id}`, getAuthHeader(token));
  return res.data;
};

// ─── Order APIs ───────────────────────────────────────

export const placeOrder = async (data, token) => {
  const res = await axios.post(`${BASE_URL}/orders/place`, data, getAuthHeader(token));
  return res.data;
};

export const getMyOrders = async (token) => {
  const res = await axios.get(`${BASE_URL}/orders/my-orders`, getAuthHeader(token));
  return res.data;
};

export const getFarmerOrders = async (token) => {
  const res = await axios.get(`${BASE_URL}/orders/farmer-orders`, getAuthHeader(token));
  return res.data;
};

export const updateOrderStatus = async (id, status, token) => {
  const res = await axios.put(
    `${BASE_URL}/orders/status/${id}`,
    { status },
    getAuthHeader(token)
  );
  return res.data;
};

export const getOrderById = async (id, token) => {
  const res = await axios.get(`${BASE_URL}/orders/${id}`, getAuthHeader(token));
  return res.data;
};