import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import Chat from './components/Chat';
import './styles/App.css';
import Index from './components/Index'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Index />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/chat/:roomName" element={<PrivateRoute element={<Chat />} />} /> {/* Route for Room */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
