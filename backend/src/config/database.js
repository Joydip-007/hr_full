const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration with SSL support for production
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'hr_database',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000
};

// Add SSL configuration for production environments
// Note: rejectUnauthorized defaults to false for managed database services
// (like Render PostgreSQL/MySQL) that may use self-signed or internal certificates.
// 
// Security trade-off: While rejectUnauthorized=false is less secure, it's necessary for
// most managed database services. The connection is still encrypted via SSL/TLS.
// 
// To enable strict certificate validation (more secure but may not work with managed services):
// Set environment variable: DB_SSL_REJECT_UNAUTHORIZED=true
if (process.env.NODE_ENV === 'production' && process.env.DB_SSL !== 'false') {
  dbConfig.ssl = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  };
}

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully');
    console.log(`✓ Connected to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    console.error('✗ Please check your database configuration');
    return false;
  }
};

module.exports = { pool, testConnection };
