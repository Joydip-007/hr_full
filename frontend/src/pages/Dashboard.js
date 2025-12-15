import React, { useState, useEffect } from 'react';
import { companyService, positionService, jobSeekerService, employeeService, applicationService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    positions: 0,
    jobSeekers: 0,
    employees: 0,
    applications: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companies, positions, jobSeekers, employees, applications] = await Promise.all([
        companyService.getAll(),
        positionService.getAll(),
        jobSeekerService.getAll(),
        employeeService.getAll(),
        applicationService.getAll()
      ]);

      setStats({
        companies: companies.data.data?.length || 0,
        positions: positions.data.data?.length || 0,
        jobSeekers: jobSeekers.data.data?.length || 0,
        employees: employees.data.data?.length || 0,
        applications: applications.data.data?.length || 0
      });

      setRecentApplications(applications.data.data?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = status?.toLowerCase().replace(/\s+/g, '-') || 'applied';
    return <span className={`badge badge-${statusClass}`}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.companies}</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-card green">
          <div className="stat-number">{stats.positions}</div>
          <div className="stat-label">Open Positions</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-number">{stats.jobSeekers}</div>
          <div className="stat-label">Job Seekers</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-number">{stats.employees}</div>
          <div className="stat-label">Employees</div>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recent Applications</h2>
      
      {recentApplications.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Position</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.application_id}>
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
      ) : (
        <p>No recent applications found.</p>
      )}
    </div>
  );
}

export default Dashboard;
