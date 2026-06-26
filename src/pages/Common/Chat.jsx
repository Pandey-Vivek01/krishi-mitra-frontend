import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMyConversations, getMessages } from "../../services/chatService";
import {
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
  setOnlineUsers,
  updateConversationLastMessage,
} from "../../redux/slices/chatSlice";
import { initSocket, getSocket } from "../../socket/socket";

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { conversations, selectedConversation, messages, onlineUsers } =
    useSelector((state) => state.chat);

  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Init socket
  useEffect(() => {
    const socket = initSocket();
    socket.emit("user_online", user._id);

    socket.on("online_users", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("receive_message", (message) => {
      dispatch(addMessage(message));
      dispatch(
        updateConversationLastMessage({
          conversationId: message.conversation,
          lastMessage: message.text,
        })
      );
    });

    socket.on("user_typing", () => setIsTyping(true));
    socket.on("user_stop_typing", () => setIsTyping(false));

    return () => {
      socket.off("online_users");
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, []);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getMyConversations(token);
        dispatch(setConversations(res.conversations));
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, []);

  // Join room + fetch messages when conversation selected
  useEffect(() => {
    if (!selectedConversation) return;

    const socket = getSocket();
    socket.emit("join_conversation", selectedConversation._id);
    socket.emit("mark_seen", {
      conversationId: selectedConversation._id,
      userId: user._id,
    });

    const fetchMessages = async () => {
      try {
        const res = await getMessages(selectedConversation._id, token);
        dispatch(setMessages(res.messages));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !selectedConversation) return;

    const socket = getSocket();
    socket.emit("send_message", {
      conversationId: selectedConversation._id,
      senderId: user._id,
      text: text.trim(),
    });

    setText("");
    socket.emit("stop_typing", {
      conversationId: selectedConversation._id,
      userId: user._id,
    });
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    const socket = getSocket();

    if (!typing) {
      setTyping(true);
      socket.emit("typing", {
        conversationId: selectedConversation?._id,
        userId: user._id,
      });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        conversationId: selectedConversation?._id,
        userId: user._id,
      });
      setTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants?.find((p) => p._id !== user._id);
  };

  const isOnline = (userId) => onlineUsers.includes(userId);

  return (
    <div className="flex h-[calc(100vh-64px)] max-w-6xl mx-auto">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-green-700">
            {t("chat.conversations", "Conversations")}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-center text-gray-400 mt-8 text-sm">
              {t("chat.noConversations", "No conversations yet")}
            </p>
          ) : (
            conversations.map((conv) => {
              const other = getOtherParticipant(conv);
              const online = isOnline(other?._id);
              return (
                <div
                  key={conv._id}
                  onClick={() => dispatch(setSelectedConversation(conv))}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 ${
                    selectedConversation?._id === conv._id
                      ? "bg-green-50"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                      {other?.firstName?.[0]}
                    </div>
                    {online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {other?.firstName} {other?.lastName}
                    </p>
                    {conv.product && (
                      <p className="text-xs text-green-600 truncate">
                        🌾 {conv.product?.cropName}
                      </p>
                    )}
                    {conv.lastMessage && (
                      <p className="text-xs text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                  {getOtherParticipant(selectedConversation)?.firstName?.[0]}
                </div>
                {isOnline(getOtherParticipant(selectedConversation)?._id) && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {getOtherParticipant(selectedConversation)?.firstName}{" "}
                  {getOtherParticipant(selectedConversation)?.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {isOnline(getOtherParticipant(selectedConversation)?._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMine = msg.sender?._id === user._id;
                return (
                  <div
                    key={msg._id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${
                        isMine
                          ? "bg-green-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isMine ? "text-green-200" : "text-gray-400"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {isMine && (
                          <span className="ml-1">{msg.seen ? "✓✓" : "✓"}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm">
                    <p className="text-gray-400 text-sm">typing...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <input
                type="text"
                value={text}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder={t("chat.typeMessage", "Type a message...")}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {t("chat.send", "Send")}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-4xl mb-3">💬</p>
              <p>{t("chat.selectConversation", "Select a conversation to start chatting")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;