import React, { useState, useEffect } from 'react';
import '../styles/LeadsPage.css';

const LeadsFormList = ({ refreshTrigger }) => {
  const [leads, setLeads] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeads: 0,
    limit: 5,
  });

  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token, refreshTrigger, pagination.currentPage]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/leads?page=${pagination.currentPage}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLeads(data.data.leads);
        setPagination({
          currentPage: data.data.pagination.currentPage,
          totalPages: data.data.pagination.totalPages,
          totalLeads: data.data.pagination.totalLeads,
          limit: data.data.pagination.limit,
        });
        setError('');
      } else {
        const errorMessage =
          typeof data.message === 'string'
            ? data.message
            : JSON.stringify(data.message) || 'Failed to fetch leads';
        setError(errorMessage);
      }
    } catch (error) {
      setError('Error fetching leads: ' + error.message);
      console.error('Fetch leads error:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  const generatePageNumbers = () => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    const pages = [];
    const maxPageNumbers = 5;

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (totalPages <= maxPageNumbers) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        endPage = maxPageNumbers;
      } else if (currentPage + 2 > totalPages) {
        startPage = totalPages - maxPageNumbers + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="lead-list-container">
      <h2 className="lead-list-title">Leads List</h2>
      {error && (
        <div className="lead-message error">
          {error}
        </div>
      )}
      <div className="lead-table-wrapper">
        <table className="lead-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Loan Type</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.loanType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-button ${pagination.currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pagination.currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeadsFormList;
