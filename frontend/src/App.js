import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Positions from './pages/Positions';
import JobSeekers from './pages/JobSeekers';
import Employees from './pages/Employees';
import Applications from './pages/Applications';
import './App.css';

function App() {
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
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/job-seekers" element={<JobSeekers />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/applications" element={<Applications />} />
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
