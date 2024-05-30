// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './Loading'; // Import the LoadingSpinner component

const PublicRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      <LoadingSpinner loading={loading} /> {/* Pass loading state to LoadingSpinner */}
      <div className="content">
        {isAuthenticated ? <Navigate to="/chat" /> : element}
      </div>
    </>
  );
};

export default PublicRoute;
