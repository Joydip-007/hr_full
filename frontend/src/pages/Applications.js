import React, { useState, useEffect } from 'react';
import { applicationService } from '../services/api';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getAll();
      setApplications(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Applied': 'badge-applied',
      'Under Review': 'badge-applied',
      'Interview': 'badge-interview',
      'Offered': 'badge-offered',
      'Rejected': 'badge-rejected',
      'Accepted': 'badge-accepted'
    };
    return <span className={`badge ${statusMap[status] || 'badge-applied'}`}>{status}</span>;
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Job Applications</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant</th>
              <th>Position</th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.application_id}</td>
                <td>{app.applicant_name}</td>
                <td>{app.position_role}</td>
                <td>{app.company_name}</td>
                <td>{getStatusBadge(app.status)}</td>
                <td>{new Date(app.application_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <p>No applications found. Connect to the database to see data.</p>
      )}
    </div>
  );
}

export default Applications;
