import React, { useState, useEffect } from 'react';
import { companyService } from '../services/api';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getAll();
      setCompanies(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch companies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading companies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Companies</h1>

      <div className="card-grid">
        {companies.map((company) => (
          <div key={company.company_id} className="card">
            <h3 className="card-title">{company.name}</h3>
            <p className="card-subtitle">{company.city}, {company.state}</p>
            <div className="card-content">
              <p><strong>Employees:</strong> {company.number_of_employees?.toLocaleString()}</p>
              <p><strong>Rating:</strong> {company.rating ? `${company.rating}/5` : 'N/A'}</p>
              <p><strong>Country:</strong> {company.country}</p>
            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && (
        <p>No companies found. Connect to the database to see data.</p>
      )}
    </div>
  );
}

export default Companies;
