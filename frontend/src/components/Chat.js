import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import '../styles/Chat.css'; // Ensure this path is correct

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://192.168.37.100:3000', {
      withCredentials: true
    });
        
    socketRef.current.on('connect', () => {
      console.log('Connected to backend');
    });

    socketRef.current.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    socketRef.current.on('chatMessage', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on('updateActiveUsers', (activeUsers) => {
      console.log('Active users:', activeUsers);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current.emit('chatMessage', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}-${String(date.getFullYear()).slice(2)}:${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
    return (
      formattedDate
    );
  }
  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
          <div key={index} className="message">
            <div>
              <span className="username">{message.username} </span>
              <em className="timestamp">{formatTimestamp(message.timestamp)}</em>
            </div>
            <span className="message-content">{message.message}</span>
          </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
