import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/LeadsPage.css';

const LeadsFormCreate = ({ onLeadSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ name: '', phone: '', email: '', loanType: '' });

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Lead submitted successfully!');
        setFormData({ name: '', phone: '', email: '', loanType: '' });
        onLeadSubmitted();
      } else {
        const errorMessage =
          typeof data.message === 'string'
            ? data.message
            : JSON.stringify(data.message) || 'Failed to submit lead';
        
        const errorParts = errorMessage.split('; ').map(msg => msg.trim());
        const newErrors = { name: '', phone: '', email: '', loanType: '' };

        errorParts.forEach(msg => {
          if (msg.toLowerCase().includes('name')) {
            newErrors.name = msg;
          } else if (msg.toLowerCase().includes('phone')) {
            newErrors.phone = msg;
          } else if (msg.toLowerCase().includes('email')) {
            newErrors.email = msg;
          } else if (msg.toLowerCase().includes('loan type')) {
            newErrors.loanType = msg;
          } else {
            toast.error(msg);
          }
        });

        setErrors(newErrors);
      }
    } catch (error) {
      toast.error('Error submitting lead: ' + error.message);
      console.error('Submit lead error:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="lead-form-container">
      <h2 className="lead-form-title">Create Customer</h2>
      <form className="lead-form-content" onSubmit={handleSubmit}>
        <div>
          <label className="lead-form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="lead-form-input"
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label className="lead-form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="lead-form-input"
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <div>
          <label className="lead-form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="lead-form-input"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <label className="lead-form-label">Loan Type</label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className="lead-form-input"
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Personal Loan Consolidation">Personal Loan Consolidation</option>
            <option value="Credit Card Installment Consolidation">Credit Card Installment Consolidation</option>
            <option value="Paylater Loan Consolidation">Paylater Loan Consolidation</option>
            <option value="Online Loan Consolidation">Online Loan Consolidation</option>
          </select>
          {errors.loanType && <p className="error-message">{errors.loanType}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="lead-form-button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Lead'}
        </button>
      </form>
    </div>
  );
};

export default LeadsFormCreate;