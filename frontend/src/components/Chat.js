import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css'; // Corrected import path
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch initial messages and active users from your backend
    // For now, we'll use dummy data
    setMessages([
      { user: 'User1', text: 'Hello!' },
      { user: 'User2', text: 'Hi there!' },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send newMessage to your backend
      setMessages((prevMessages) => [...prevMessages, { user: user.username, text: newMessage }]);
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

  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.user}: </strong>
              <span>{message.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Call handleKeyDown on key press
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
