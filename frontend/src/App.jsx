import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import LeadsPage from './pages/LeadsPage';
import RegisterPage from './pages/RegisterPage'; 
import './App.css';
import ChatbotWidget from './components/ChatbotWidget';
import { jwtDecode } from 'jwt-decode';
import LazyLoadImagePage from './pages/LazyLoadPage';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  try {
    const decodedToken = jwtDecode(token);  
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      alert('Your session has expired. Please log in again.');
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error('Error decoding token', error);
  }

  return children;
};

function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); 
  };

  const showNavbar = location.pathname !== '/' && location.pathname !== '/register' || token;

  return (
    <div className="app-container">
      {showNavbar && (
        <Navbar isAuthenticated={!!token} onLogout={handleLogout} />
      )}
      <Routes>
      <Route path="/lazy-load-image" element={<LazyLoadImagePage />}/>
      <Route path="/register" element={<RegisterPage />} /> 
      <Route path="/" element={token ? <Navigate to="/leads" /> : <LoginPage />} />
      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <LeadsPage />
          </ProtectedRoute>
        }
      />
      </Routes>
      <ChatbotWidget /> 

    </div>
  );
}

export default App;
