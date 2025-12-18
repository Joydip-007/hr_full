import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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

// Protected Route component for admin-only pages
function AdminRoute({ children }) {
  const user = authService.getUser();
  const isAdmin = user && user.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

function App() {
  const user = authService.getUser();
  const isLoggedIn = authService.isAuthenticated();
  const isAdmin = user && user.role === 'admin';

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
            {isAdmin && (
              <>
                <li><Link to="/job-seekers">Job Seekers</Link></li>
                <li><Link to="/employees">Employees</Link></li>
                <li><Link to="/applications">Applications</Link></li>
              </>
            )}
          </ul>
          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <span className="user-name">Hi, {user?.first_name}</span>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="btn btn-small btn-admin">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="btn btn-small btn-danger">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-small">Login</Link>
                <Link to="/signup" className="btn btn-small btn-primary">Sign Up</Link>
                <Link to="/admin/login" className="btn btn-small btn-admin-link">Admin</Link>
              </>
            )}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/job-seekers" element={
              <AdminRoute><JobSeekers /></AdminRoute>
            } />
            <Route path="/employees" element={
              <AdminRoute><Employees /></AdminRoute>
            } />
            <Route path="/applications" element={
              <AdminRoute><Applications /></AdminRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute><AdminDashboard /></AdminRoute>
            } />
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
