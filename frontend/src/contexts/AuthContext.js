import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { backendEndpoint } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${backendEndpoint}/api/auth/status`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Assuming your backend sends user data
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${backendEndpoint}/api/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
