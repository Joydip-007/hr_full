import React, { useState, useEffect } from 'react';
import { positionService } from '../services/api';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await positionService.getAll();
      setPositions(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch positions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  if (loading) return <div className="loading">Loading positions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Open Positions</h1>

      <div className="card-grid">
        {positions.map((position) => (
          <div key={position.position_id} className="card">
            <h3 className="card-title">{position.role}</h3>
            <p className="card-subtitle">{position.company_name}</p>
            <div className="card-content">
              <p><strong>Type:</strong> {position.ft_pte}</p>
              <p><strong>Salary:</strong> {formatSalary(position.salary)}</p>
              <p><strong>Location:</strong> {position.city}, {position.state}</p>
            </div>
          </div>
        ))}
      </div>

      {positions.length === 0 && (
        <p>No positions found. Connect to the database to see data.</p>
      )}
    </div>
  );
}

export default Positions;
