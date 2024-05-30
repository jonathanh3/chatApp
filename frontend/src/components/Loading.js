// src/components/LoadingSpinner.js
import React from 'react';
import '../styles/Loading.css'; // Import CSS file for styling

const LoadingSpinner = ({ loading }) => {
  return (
    <>
      {loading && ( // Render overlay and loading spinner if loading
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
