import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createRazorpayOrder = async (orderId, token) => {
  const res = await axios.post(
    `${BASE_URL}/payment/create-order`,
    { orderId },
    getAuthHeader(token)
  );
  return res.data;
};

export const verifyPayment = async (data, token) => {
  const res = await axios.post(
    `${BASE_URL}/payment/verify`,
    data,
    getAuthHeader(token)
  );
  return res.data;
};