import React, { useState, useEffect } from 'react';
import { jobSeekerService } from '../services/api';

function JobSeekers() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const fetchJobSeekers = async () => {
    try {
      const response = await jobSeekerService.getAll();
      setJobSeekers(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch job seekers');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  if (loading) return <div className="loading">Loading job seekers...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Job Seekers</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Age</th>
              <th>Willing to Move</th>
            </tr>
          </thead>
          <tbody>
            {jobSeekers.map((seeker) => (
              <tr key={seeker.job_seeker_id}>
                <td>{seeker.first_name} {seeker.last_name}</td>
                <td>{seeker.city}, {seeker.state}</td>
                <td>{calculateAge(seeker.dob)}</td>
                <td>{seeker.willing_to_move ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobSeekers.length === 0 && (
        <p>No job seekers found. Connect to the database to see data.</p>
      )}
    </div>
  );
}

export default JobSeekers;
