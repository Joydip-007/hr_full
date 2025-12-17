import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Positions from './pages/Positions';
import JobSeekers from './pages/JobSeekers';
import Employees from './pages/Employees';
import Applications from './pages/Applications';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Apply from './pages/Apply';
import { authService } from './services/api';
import './App.css';

function App() {
  const user = authService.getUser();
  const isLoggedIn = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">HR Database</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/companies">Companies</Link></li>
            <li><Link to="/positions">Positions</Link></li>
            <li><Link to="/job-seekers">Job Seekers</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/applications">Applications</Link></li>
          </ul>
          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <span className="user-name">Hi, {user?.first_name}</span>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="btn btn-small">Admin</Link>
                )}
                <button onClick={handleLogout} className="btn btn-small btn-danger">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-small">Login</Link>
                <Link to="/signup" className="btn btn-small btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/job-seekers" element={<JobSeekers />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/apply/:positionId" element={<Apply />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 HR Database Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
