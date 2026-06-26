import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext"; // To get your logged-in user

// Connect to your hybrid backend server
const SOCKET_SERVER_URL = "http://localhost:5000"; 

export const useChat = (conversationId) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !user) return;

    // 1. Initialize the Socket Connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });

    // 2. Join the Specific Chat Room
    socketRef.current.emit("join_chat", conversationId);

    // 3. Listen for Incoming Messages
    socketRef.current.on("receive_message", (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    // 4. Cleanup on Unmount (when they close the chat)
    return () => {
      socketRef.current.disconnect();
    };
  }, [conversationId, user]);

  // 5. Function to Send a Message
  const sendMessage = (text) => {
    if (!text.trim() || !socketRef.current) return;

    const messageData = {
      conversationId,
      senderId: user._id,
      text,
      createdAt: new Date().toISOString(), // Optimistic timestamp
    };

    // Send to Socket.io
    socketRef.current.emit("send_message", messageData);
  };

  // 6. Function to load initial history from the REST API
  const loadHistory = async (historyArray) => {
      setMessages(historyArray);
  };

  return { messages, sendMessage, loadHistory };
};