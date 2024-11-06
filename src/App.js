// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Cuenta from './pages/account';
import DeleteAccount from './pages/deleteAccount';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cuenta" element={<Cuenta />} /> {/* Página de cuenta */}
      </Routes>
    </Router>
  );
}

export default App;
