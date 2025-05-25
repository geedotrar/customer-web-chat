import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ email: '', password: '' });

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        localStorage.setItem('token', data.data);
        navigate('/customer');
      } else {
        const errorMessage =
          typeof data.message === 'string' ? data.message : JSON.stringify(data.message) || 'Failed to login';
        const errorParts = errorMessage.split('; ').map(msg => msg.trim());
        const newErrors = { email: '', password: '' };

        errorParts.forEach(msg => {
          if (msg.toLowerCase().includes('email')) {
            newErrors.email = msg;
          } else if (msg.toLowerCase().includes('password')) {
            newErrors.password = msg;
          } else {
            newErrors.email = msg;
          }
        });

        setErrors(newErrors);
        console.log('Errors set to:', newErrors); 
      }
    } catch (error) {
      const errorMessage = 'Error during login: ' + error.message;
      setErrors({ email: errorMessage, password: '' });
      console.error('Login error:', error, 'Message:', errorMessage); 
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">

        <div className="logo-container">
          <img
            src='./customer.png' 
            alt="Customer-Logo"
            className="logo-image"
          />
        </div>

        <h2 className="login-form-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form-content">
          <div className="form-group">
            <label className="login-form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-form-input"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="login-form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login-form-input"
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form-button"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;