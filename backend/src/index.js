const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'HR Database API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to HR Database API',
    version: '1.0.0',
    endpoints: {
      locations: '/api/locations',
      companies: '/api/companies',
      positions: '/api/positions',
      benefits: '/api/benefits',
      requirements: '/api/requirements',
      jobSeekers: '/api/job-seekers',
      employees: '/api/employees',
      applications: '/api/applications'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Start server
const startServer = async () => {
  // Test database connection
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.warn('Warning: Database connection failed. Some features may not work.');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
};

startServer();

module.exports = app;
