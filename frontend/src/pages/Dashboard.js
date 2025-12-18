import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyService, positionService, authService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    positions: 0
  });
  const [recentPositions, setRecentPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getUser();
  const isLoggedIn = authService.isAuthenticated();
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companies, positions] = await Promise.all([
        companyService.getAll(),
        positionService.getAll()
      ]);

      setStats({
        companies: companies.data.data?.length || 0,
        positions: positions.data.data?.length || 0
      });

      setRecentPositions(positions.data.data?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="page-container dashboard-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            {isLoggedIn ? `Welcome back, ${user?.first_name}!` : 'Find Your Dream Job'}
          </h1>
          <p className="welcome-subtitle">
            {isLoggedIn 
              ? 'Browse open positions and apply to your next opportunity.'
              : 'Sign up today to access job opportunities from top companies.'}
          </p>
          {!isLoggedIn && (
            <div className="welcome-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/login" className="btn btn-secondary btn-lg">Sign In</Link>
            </div>
          )}
          {isAdmin && (
            <div className="admin-notice">
              <p>You are logged in as an administrator.</p>
              <Link to="/admin/dashboard" className="btn btn-admin">Go to Admin Panel</Link>
            </div>
          )}
        </div>
      </div>

      {/* Public Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.companies}</div>
          <div className="stat-label">Partner Companies</div>
        </div>
        <div className="stat-card green">
          <div className="stat-number">{stats.positions}</div>
          <div className="stat-label">Open Positions</div>
        </div>
      </div>

      {/* Featured Positions */}
      <div className="featured-section">
        <div className="section-header-home">
          <h2>Featured Positions</h2>
          <Link to="/positions" className="btn btn-primary">View All Positions</Link>
        </div>

        <div className="card-grid">
          {recentPositions.map((position) => (
            <div key={position.position_id} className="card position-card">
              <h3 className="card-title">{position.role}</h3>
              <p className="card-subtitle">{position.company_name}</p>
              <div className="card-content">
                <p><strong>Type:</strong> {position.ft_pte}</p>
                <p><strong>Salary:</strong> {formatSalary(position.salary)}</p>
                <p><strong>Location:</strong> {position.city}, {position.state}</p>
              </div>
              <div className="card-actions">
                {isLoggedIn ? (
                  <Link to={`/apply/${position.position_id}`} className="btn btn-apply">
                    + Apply Now
                  </Link>
                ) : (
                  <Link to="/signup" className="btn btn-apply">
                    Sign Up to Apply
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action for non-logged in users */}
      {!isLoggedIn && (
        <div className="cta-section">
          <h2>Ready to Start Your Career Journey?</h2>
          <p>Create an account to apply for jobs and track your applications.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">Create Account</Link>
            <Link to="/companies" className="btn btn-secondary btn-lg">Browse Companies</Link>
          </div>
        </div>
      )}

      {/* Quick Links for logged-in users */}
      {isLoggedIn && !isAdmin && (
        <div className="quick-links-section">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            <Link to="/positions" className="quick-link-card">
              <div className="quick-link-icon">P</div>
              <div className="quick-link-text">
                <h3>Browse Positions</h3>
                <p>Find your next opportunity</p>
              </div>
            </Link>
            <Link to="/companies" className="quick-link-card">
              <div className="quick-link-icon">C</div>
              <div className="quick-link-text">
                <h3>View Companies</h3>
                <p>Explore potential employers</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
