import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import Chat from './components/pages/Chat';
import Home from './components/pages/Home';
import Navbar from './components/Navbar'; // Import the Navbar component

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<PrivateRoute element={<Home />} />} />
              <Route path="/register" element={<PublicRoute element={<Register />} />} />
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/chat/:roomName" element={<PrivateRoute element={<Chat />} />} />
              <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
