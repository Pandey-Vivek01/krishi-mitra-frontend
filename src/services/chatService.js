import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Get or Create Conversation
export const getOrCreateConversation = async (data, token) => {
  const res = await axios.post(
    `${BASE_URL}/chat/conversation`,
    data,
    getAuthHeader(token)
  );
  return res.data;
};

// Get all conversations of logged in user
export const getMyConversations = async (token) => {
  const res = await axios.get(
    `${BASE_URL}/chat/conversations`,
    getAuthHeader(token)
  );
  return res.data;
};

// Get messages of a conversation
export const getMessages = async (conversationId, token) => {
  const res = await axios.get(
    `${BASE_URL}/chat/messages/${conversationId}`,
    getAuthHeader(token)
  );
  return res.data;
};

// Send message (REST fallback)
export const sendMessage = async (data, token) => {
  const res = await axios.post(
    `${BASE_URL}/chat/message`,
    data,
    getAuthHeader(token)
  );
  return res.data;
};