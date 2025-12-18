import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService, authService, jobSeekerService, employeeService, positionService } from '../services/api';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApplication, setNewApplication] = useState({ job_seeker_id: '', position_id: '' });
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getUser();
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [appsRes, seekersRes, empsRes, posRes] = await Promise.all([
        applicationService.getAll(),
        jobSeekerService.getAll(),
        employeeService.getAll(),
        positionService.getAll()
      ]);
      setApplications(appsRes.data.data || []);
      setJobSeekers(seekersRes.data.data || []);
      setEmployees(empsRes.data.data || []);
      setPositions(posRes.data.data || []);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setActionLoading(applicationId);
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
    } finally {
      setActionLoading(null);
    }
  };

  const handleQuickAction = async (applicationId, action) => {
    const newStatus = action === 'accept' ? 'Accepted' : 'Rejected';
    await handleStatusChange(applicationId, newStatus);
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (!newApplication.job_seeker_id || !newApplication.position_id) {
      alert('Please select both job seeker and position');
      return;
    }
    try {
      await applicationService.create({
        job_seeker_id: parseInt(newApplication.job_seeker_id),
        position_id: parseInt(newApplication.position_id)
      });
      setShowAddModal(false);
      setNewApplication({ job_seeker_id: '', position_id: '' });
      fetchAllData();
    } catch (err) {
      console.error('Failed to create application:', err);
      alert('Failed to create application. The applicant may have already applied for this position.');
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await applicationService.delete(applicationId);
      setApplications(apps => apps.filter(app => app.application_id !== applicationId));
    } catch (err) {
      console.error('Failed to delete application:', err);
      alert('Failed to delete application');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
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

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) return <div className="loading">Loading admin dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard-full">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage applications, job seekers, and employees</p>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid-admin">
        <div className="stat-card-admin total">
          <div className="stat-icon">A</div>
          <div className="stat-info">
            <div className="stat-number">{applications.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
        <div className="stat-card-admin seekers">
          <div className="stat-icon">J</div>
          <div className="stat-info">
            <div className="stat-number">{jobSeekers.length}</div>
            <div className="stat-label">Job Seekers</div>
          </div>
        </div>
        <div className="stat-card-admin employees">
          <div className="stat-icon">E</div>
          <div className="stat-info">
            <div className="stat-number">{employees.length}</div>
            <div className="stat-label">Employees</div>
          </div>
        </div>
        <div className="stat-card-admin positions">
          <div className="stat-icon">P</div>
          <div className="stat-info">
            <div className="stat-number">{positions.length}</div>
            <div className="stat-label">Open Positions</div>
          </div>
        </div>
      </div>

      {/* Application Status Summary */}
      <div className="status-summary">
        <div className="status-item pending" onClick={() => { setActiveTab('applications'); setStatusFilter('Applied'); }}>
          <span className="status-count">{statusCounts.Applied}</span>
          <span className="status-text">Pending</span>
        </div>
        <div className="status-item review" onClick={() => { setActiveTab('applications'); setStatusFilter('Under Review'); }}>
          <span className="status-count">{statusCounts['Under Review']}</span>
          <span className="status-text">Under Review</span>
        </div>
        <div className="status-item interview" onClick={() => { setActiveTab('applications'); setStatusFilter('Interview'); }}>
          <span className="status-count">{statusCounts.Interview}</span>
          <span className="status-text">Interview</span>
        </div>
        <div className="status-item offered" onClick={() => { setActiveTab('applications'); setStatusFilter('Offered'); }}>
          <span className="status-count">{statusCounts.Offered}</span>
          <span className="status-text">Offered</span>
        </div>
        <div className="status-item accepted" onClick={() => { setActiveTab('applications'); setStatusFilter('Accepted'); }}>
          <span className="status-count">{statusCounts.Accepted}</span>
          <span className="status-text">Accepted</span>
        </div>
        <div className="status-item rejected" onClick={() => { setActiveTab('applications'); setStatusFilter('Rejected'); }}>
          <span className="status-count">{statusCounts.Rejected}</span>
          <span className="status-text">Rejected</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'jobseekers' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobseekers')}
        >
          Job Seekers ({jobSeekers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Employees ({employees.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              {/* Recent Applications */}
              <div className="overview-card">
                <div className="overview-card-header">
                  <h3>Recent Applications</h3>
                  <button className="btn btn-small btn-primary" onClick={() => setActiveTab('applications')}>
                    View All
                  </button>
                </div>
                <div className="overview-list">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.application_id} className="overview-list-item">
                      <div className="overview-item-info">
                        <strong>{app.applicant_name}</strong>
                        <span>{app.position_role} at {app.company_name}</span>
                      </div>
                      <div className="overview-item-actions">
                        {getStatusBadge(app.status)}
                        {app.status === 'Applied' && (
                          <div className="quick-actions">
                            <button 
                              className="btn-icon btn-accept" 
                              onClick={() => handleQuickAction(app.application_id, 'accept')}
                              disabled={actionLoading === app.application_id}
                              title="Accept"
                            >
                              Y
                            </button>
                            <button 
                              className="btn-icon btn-reject" 
                              onClick={() => handleQuickAction(app.application_id, 'reject')}
                              disabled={actionLoading === app.application_id}
                              title="Reject"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Job Seekers */}
              <div className="overview-card">
                <div className="overview-card-header">
                  <h3>Recent Job Seekers</h3>
                  <button className="btn btn-small btn-primary" onClick={() => setActiveTab('jobseekers')}>
                    View All
                  </button>
                </div>
                <div className="overview-list">
                  {jobSeekers.slice(0, 5).map(seeker => (
                    <div key={seeker.job_seeker_id} className="overview-list-item">
                      <div className="overview-item-info">
                        <strong>{seeker.first_name} {seeker.last_name}</strong>
                        <span>{seeker.city}, {seeker.state}</span>
                      </div>
                      <span className={`badge ${seeker.willing_to_move ? 'badge-accepted' : 'badge-applied'}`}>
                        {seeker.willing_to_move ? 'Will Relocate' : 'Local Only'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-section">
            <div className="section-header">
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
              <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
                + Add Application
              </button>
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
                    <th>Quick Actions</th>
                    <th>Change Status</th>
                    <th>Delete</th>
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
                        {app.status !== 'Accepted' && app.status !== 'Rejected' && (
                          <div className="action-buttons-inline">
                            <button 
                              className="btn btn-small btn-success"
                              onClick={() => handleQuickAction(app.application_id, 'accept')}
                              disabled={actionLoading === app.application_id}
                            >
                              Accept
                            </button>
                            <button 
                              className="btn btn-small btn-danger"
                              onClick={() => handleQuickAction(app.application_id, 'reject')}
                              disabled={actionLoading === app.application_id}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {(app.status === 'Accepted' || app.status === 'Rejected') && (
                          <span className="finalized">Finalized</span>
                        )}
                      </td>
                      <td>
                        <select 
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
                          className="status-select"
                          disabled={actionLoading === app.application_id}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interview">Interview</option>
                          <option value="Offered">Offered</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeleteApplication(app.application_id)}
                        >
                          Delete
                        </button>
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
        )}

        {/* Job Seekers Tab */}
        {activeTab === 'jobseekers' && (
          <div className="jobseekers-section">
            <div className="section-header">
              <h3>All Job Seekers</h3>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Age</th>
                    <th>Willing to Move</th>
                    <th>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {jobSeekers.map((seeker) => {
                    const seekerApps = applications.filter(a => a.job_seeker_id === seeker.job_seeker_id);
                    return (
                      <tr key={seeker.job_seeker_id}>
                        <td>{seeker.job_seeker_id}</td>
                        <td>{seeker.first_name} {seeker.last_name}</td>
                        <td>{seeker.city}, {seeker.state}</td>
                        <td>{calculateAge(seeker.dob)}</td>
                        <td>
                          <span className={`badge ${seeker.willing_to_move ? 'badge-accepted' : 'badge-rejected'}`}>
                            {seeker.willing_to_move ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>{seekerApps.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="employees-section">
            <div className="section-header">
              <h3>All Employees</h3>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Promotions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.employee_id}</td>
                      <td>{employee.first_name} {employee.last_name}</td>
                      <td>{employee.company_name || 'N/A'}</td>
                      <td>{employee.position_role || 'N/A'}</td>
                      <td>
                        <span className={`badge ${employee.former_current === 'Current' ? 'badge-accepted' : 'badge-rejected'}`}>
                          {employee.former_current}
                        </span>
                      </td>
                      <td>{employee.performance_rating ? `${employee.performance_rating}/5` : 'N/A'}</td>
                      <td>{employee.promotions_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Application</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>X</button>
            </div>
            <form onSubmit={handleAddApplication}>
              <div className="form-group">
                <label htmlFor="job_seeker_id">Select Job Seeker</label>
                <select
                  id="job_seeker_id"
                  value={newApplication.job_seeker_id}
                  onChange={(e) => setNewApplication({ ...newApplication, job_seeker_id: e.target.value })}
                  required
                >
                  <option value="">-- Select Job Seeker --</option>
                  {jobSeekers.map(seeker => (
                    <option key={seeker.job_seeker_id} value={seeker.job_seeker_id}>
                      {seeker.first_name} {seeker.last_name} - {seeker.city}, {seeker.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="position_id">Select Position</label>
                <select
                  id="position_id"
                  value={newApplication.position_id}
                  onChange={(e) => setNewApplication({ ...newApplication, position_id: e.target.value })}
                  required
                >
                  <option value="">-- Select Position --</option>
                  {positions.map(pos => (
                    <option key={pos.position_id} value={pos.position_id}>
                      {pos.role} at {pos.company_name} - ${pos.salary?.toLocaleString() || 'N/A'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
