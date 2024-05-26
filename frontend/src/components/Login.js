import React, { useState } from 'react';
import axios from 'axios';
import { backendEndpoint } from '../config';

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
        setMessage('Login successful! Redirecting to chat page...');
        setTimeout(() => {
          window.location.href = '/chat';
        }, 0);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      if (!error?.response) {
        setMessage('No Server Response');
      }
      else if (error.response?.status === 400) {
        setMessage('Missing Username or Password');
      }
      else if (error.response?.status === 401) {
        setMessage('Invalid credentials');
      }
      else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>Don't have an account? <a href="/register">Register here</a></p> {/* Add this line */}
    </div>
  );
};

export default Login;
