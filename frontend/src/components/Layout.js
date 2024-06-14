import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Outlet, Link } from 'react-router-dom';
import '../styles/Layout.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">ChatApp</Link> 
        <div className="navbar-user">
          {user.isAuthenticated ? (
            <>
              <span>Signed in as <strong>{user.name}</strong></span>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          ) : null}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
