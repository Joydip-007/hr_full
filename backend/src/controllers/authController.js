const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET environment variable is not set. Authentication will not work properly in production.');
}

const authController = {
  // Register a new user
  async register(req, res) {
    try {
      if (!JWT_SECRET) {
        return res.status(500).json({ 
          success: false, 
          error: 'Server configuration error: JWT_SECRET not set' 
        });
      }

      const { email, password, first_name, last_name, city, state, dob, willing_to_move } = req.body;

      // Validate required fields
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email, password, first name, and last name are required' 
        });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email already registered' 
        });
      }

      // Create user with linked job seeker profile
      const user = await User.createWithJobSeeker({
        email,
        password,
        first_name,
        last_name,
        city,
        state,
        dob,
        willing_to_move
      });

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({ 
        success: true, 
        data: { user, token } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Login user
  async login(req, res) {
    try {
      if (!JWT_SECRET) {
        return res.status(500).json({ 
          success: false, 
          error: 'Server configuration error: JWT_SECRET not set' 
        });
      }

      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email and password are required' 
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid email or password' 
        });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid email or password' 
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({ 
        success: true, 
        data: { user: userWithoutPassword, token } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get current user profile
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.user_id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Admin login
  async adminLogin(req, res) {
    try {
      if (!JWT_SECRET) {
        return res.status(500).json({ 
          success: false, 
          error: 'Server configuration error: JWT_SECRET not set' 
        });
      }

      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email and password are required' 
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid email or password' 
        });
      }

      // Check if user is admin
      if (user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: 'Access denied. Admin privileges required.' 
        });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid email or password' 
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({ 
        success: true, 
        data: { user: userWithoutPassword, token } 
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = authController;
