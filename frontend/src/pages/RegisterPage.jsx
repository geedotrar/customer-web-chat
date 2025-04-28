import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; 

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
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
    setErrors({ name: '', email: '', password: '' });

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        alert('Register Successfully')
        navigate('/'); 
      } else {
        const errorMessage =
          typeof data.message === 'string' ? data.message : JSON.stringify(data.message) || 'Failed to register';
        const errorParts = errorMessage.split('; ').map(msg => msg.trim());
        const newErrors = { name: '', email: '', password: '' };

        errorParts.forEach(msg => {
          if (msg.toLowerCase().includes('name')) {
            newErrors.name = msg;
          } else if (msg.toLowerCase().includes('email')) {
            newErrors.email = msg;
          } else if (msg.toLowerCase().includes('password')) {
            newErrors.password = msg;
          }
        });

        setErrors(newErrors);
        console.log('Register errors:', newErrors);
      }
    } catch (error) {
      const errorMessage = 'Error during registration: ' + error.message;
      setErrors({ email: errorMessage, password: '', name: '' });
      console.error('Register error:', error, 'Message:', errorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="logo-container">
          <img
            src='/logo.png' 
            alt="Logo"
            className="logo-image"
          />
        </div>
        <h2 className="login-form-title">Register</h2>
        <form onSubmit={handleSubmit} className="login-form-content">
          <div className="form-group">
            <label className="login-form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="login-form-input"
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
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
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
