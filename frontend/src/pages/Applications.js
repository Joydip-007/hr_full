import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService, authService } from '../services/api';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = authService.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    fetchApplications();
  }, [navigate]);

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

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.updateStatus(applicationId, newStatus);
      setApplications(apps =>
        apps.map(app =>
          app.application_id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update application status');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Applied': 'badge-applied',
      'Under Review': 'badge-under-review',
      'Interview': 'badge-interview',
      'Offered': 'badge-offered',
      'Rejected': 'badge-rejected',
      'Accepted': 'badge-accepted'
    };
    return <span className={`badge ${statusMap[status] || 'badge-applied'}`}>{status}</span>;
  };

  const filteredApplications = statusFilter === 'all'
    ? applications
    : applications.filter(app => app.status === statusFilter);

  const statusCounts = {
    all: applications.length,
    Applied: applications.filter(a => a.status === 'Applied').length,
    'Under Review': applications.filter(a => a.status === 'Under Review').length,
    Interview: applications.filter(a => a.status === 'Interview').length,
    Offered: applications.filter(a => a.status === 'Offered').length,
    Accepted: applications.filter(a => a.status === 'Accepted').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Job Applications</h1>
        <span className="admin-badge">Admin Only</span>
      </div>

      <div className="filter-section">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All ({statusCounts.all})</option>
          <option value="Applied">Applied ({statusCounts.Applied})</option>
          <option value="Under Review">Under Review ({statusCounts['Under Review']})</option>
          <option value="Interview">Interview ({statusCounts.Interview})</option>
          <option value="Offered">Offered ({statusCounts.Offered})</option>
          <option value="Accepted">Accepted ({statusCounts.Accepted})</option>
          <option value="Rejected">Rejected ({statusCounts.Rejected})</option>
        </select>
      </div>

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.application_id}</td>
                <td>{app.applicant_name}</td>
                <td>{app.position_role}</td>
                <td>{app.company_name}</td>
                <td>{getStatusBadge(app.status)}</td>
                <td>{new Date(app.application_date).toLocaleDateString()}</td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview">Interview</option>
                    <option value="Offered">Offered</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && (
        <p className="no-data">No applications found with the selected filter.</p>
      )}
    </div>
  );
}

export default Applications;
