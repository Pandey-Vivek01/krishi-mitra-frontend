import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selectedConversation: null,
  messages: [],
  onlineUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    updateConversationLastMessage: (state, action) => {
      const { conversationId, lastMessage } = action.payload;
      state.conversations = state.conversations.map((c) =>
        c._id === conversationId ? { ...c, lastMessage } : c
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
  setOnlineUsers,
  updateConversationLastMessage,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;