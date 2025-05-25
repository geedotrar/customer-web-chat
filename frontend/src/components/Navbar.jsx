import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">Customer Management</h1>
      <nav className="navbar-links">
        {isAuthenticated ? (
          <>
            <NavLink 
              to="/customer" 
              className={({ isActive }) => 
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Customer
            </NavLink>
            <NavLink 
              to="/lazy-load-image" 
              className={({ isActive }) => 
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Lazy Load Image
            </NavLink>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
