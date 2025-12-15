import React, { useState, useEffect } from 'react';
import { employeeService } from '../services/api';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Employees</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
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

      {employees.length === 0 && (
        <p>No employees found. Connect to the database to see data.</p>
      )}
    </div>
  );
}

export default Employees;
