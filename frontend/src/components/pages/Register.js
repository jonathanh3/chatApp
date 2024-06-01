import React, { useState } from 'react';
import { backendEndpoint } from '../../config';
import '../../styles/Forms.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessages(['Passwords do not match']);
      return;
    }

    // if (password.length < 8) {
    //   setMessage('Password must be at least 8 characters long');
    //   return;
    // }

    try {
      const response = await fetch(`${backendEndpoint}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setMessages(['Registration successful! Redirecting to login page...']);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessages(result.msg || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        {messages && (
          <div className="form-response-message">
            <ul>
              {Array.isArray(messages) ? (
                messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))
              ) : (
                <li>{messages}</li>
              )}
            </ul>
          </div>
        )}
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
