const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { authController } = require('../controllers');
const { authenticate } = require('../middleware/auth');

// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: { 
    success: false, 
    error: 'Too many login attempts, please try again after 15 minutes' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 registration attempts per hour
  message: { 
    success: false, 
    error: 'Too many registration attempts, please try again later' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for API requests
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per minute
  message: { 
    success: false, 
    error: 'Too many requests, please try again later' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes with rate limiting
router.post('/register', registerLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/admin/login', authLimiter, authController.adminLogin);

// Protected routes with rate limiting
router.get('/profile', apiLimiter, authenticate, authController.getProfile);

module.exports = router;
