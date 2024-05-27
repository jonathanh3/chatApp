import React, { useState } from 'react';
import axios from 'axios';
import { backendEndpoint } from '../config';
import '../styles/Forms.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${backendEndpoint}/auth/login`,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const result = response.data;
      console.log(result);
      if (result.success) {
        // setMessage('Login successful! Redirecting to chat page...');
        setTimeout(() => {
          window.location.href = '/chat';
        }, 0);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      if (!error?.response) {
        setMessage('No Server Response');
      } else if (error.response?.status === 400) {
        setMessage('Missing Username or Password');
      } else if (error.response?.status === 401) {
        setMessage('Invalid credentials');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h1>Login</h1>
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
          <button type="submit" className="btn-primary">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
