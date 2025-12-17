import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { positionService, applicationService, authService } from '../services/api';

function Apply() {
  const { positionId } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login', { state: { from: `/apply/${positionId}` } });
      return;
    }
    
    fetchPositionDetails();
  }, [positionId, navigate]);

  const fetchPositionDetails = async () => {
    try {
      const [posRes, benRes, reqRes] = await Promise.all([
        positionService.getById(positionId),
        positionService.getBenefits(positionId),
        positionService.getRequirements(positionId)
      ]);
      
      setPosition(posRes.data.data);
      setBenefits(benRes.data.data || []);
      setRequirements(reqRes.data.data || []);
    } catch (err) {
      setError('Failed to fetch position details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const user = authService.getUser();
      if (!user || !user.job_seeker_id) {
        setError('Please complete your profile before applying');
        return;
      }

      await applicationService.create({
        job_seeker_id: user.job_seeker_id,
        position_id: parseInt(positionId),
        status: 'Applied'
      });

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setSubmitting(false);
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

  if (loading) return <div className="loading">Loading position details...</div>;
  if (error && !position) return <div className="error">{error}</div>;

  if (success) {
    return (
      <div className="page-container">
        <div className="success-message">
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying to {position?.role} at {position?.company_name}.</p>
          <p>We will review your application and get back to you soon.</p>
          <div className="action-buttons">
            <Link to="/positions" className="btn btn-primary">Browse More Jobs</Link>
            <Link to="/applications" className="btn btn-success">View My Applications</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/positions" className="back-link">&larr; Back to Positions</Link>
      
      <h1 className="page-title">Apply for Position</h1>
      
      {position && (
        <div className="position-details">
          <div className="position-header">
            <h2>{position.role}</h2>
            <p className="company-name">{position.company_name}</p>
          </div>
          
          <div className="position-info">
            <div className="info-item">
              <strong>Type:</strong> {position.ft_pte}
            </div>
            <div className="info-item">
              <strong>Salary:</strong> {formatSalary(position.salary)}
            </div>
            <div className="info-item">
              <strong>Location:</strong> {position.city}, {position.state}
            </div>
          </div>

          {requirements.length > 0 && (
            <div className="section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {requirements.map((req) => (
                  <li key={req.requirement_id}>
                    <strong>{req.name}</strong>
                    {req.description && <p>{req.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {benefits.length > 0 && (
            <div className="section">
              <h3>Benefits</h3>
              <ul className="benefits-list">
                {benefits.map((ben) => (
                  <li key={ben.benefit_id}>
                    <strong>{ben.name}</strong>
                    {ben.description && <p>{ben.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="apply-form">
        <div className="form-notice">
          <p>Your profile information will be submitted with this application.</p>
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
          {submitting ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default Apply;
