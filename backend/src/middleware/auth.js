const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET environment variable is not set. Authentication will not work properly in production.');
}

// Authenticate JWT token
const authenticate = (req, res, next) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server configuration error: JWT_SECRET not set' 
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      error: 'No token provided' 
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid token format' 
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      error: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

// Check if user is applicant
const isApplicant = (req, res, next) => {
  if (req.user.role !== 'applicant') {
    return res.status(403).json({ 
      success: false, 
      error: 'Access denied. Applicant account required.' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  isAdmin,
  isApplicant
};
