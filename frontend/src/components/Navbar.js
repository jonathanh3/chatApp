// src/components/Navbar.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">ChatApp</div>
      <div className="navbar-user">
        <span>Signed in as {user.username}</span>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
