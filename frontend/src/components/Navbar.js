// src/components/Navbar.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ChatApp</Link> 
      <div className="navbar-user">
        <span>Signed in as <strong>{user.username}</strong></span>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
