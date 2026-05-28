import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  // cookies ke liye
});

// Send OTP
export const sendOTP = async (email) => {
    const response = await api.post("/auth/sendotp", { email });
    return response.data;
};

// Signup
export const signup = async (data) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};

// Login
export const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

// Change Password
export const changePassword = async (oldPassword, newPassword, token) => {
    const response = await api.post("/auth/changepassword", 
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};