import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/pages/NotFound';
import Chat from './components/pages/Chat';
import Home from './components/pages/Home';
import Navbar from './components/Navbar'; // Import the Navbar component

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />

          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/chat/:roomName" element={<PrivateRoute element={<Chat />} />} />

          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
