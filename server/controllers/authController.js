const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

const HARDCODED_USERS = {
  'nayan@kavyainfoweb.com': { password: 'Nayan@4664', role: 'Super Admin', fullName: 'Nayan' },
  'sushil@kavyainfoweb.com': { password: 'Sushil@4664', role: 'Company Admin', fullName: 'Sushil' },
  'rajni@kavyainfoweb.com': { password: 'Rajni@4664', role: 'Project Manager', fullName: 'Rajni' },
  'raj@kavyainfoweb.com': { password: 'Raj@4664', role: 'HR', fullName: 'Raj' },
  'priti@kavyainfoweb.com': { password: 'Priti@4664', role: 'Team Lead', fullName: 'Priti' }
};

// @desc    Register new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  // We don't save to DB as per request, but we allow the user to "register" 
  // so they can proceed to the login page.
  res.status(201).json({ 
    message: 'Registration successful! You can now login with your authorized credentials.',
    success: true 
  });
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hardcodedUser = HARDCODED_USERS[normalizedEmail];

    // Check specific hardcoded roles
    if (hardcodedUser) {
      if (password === hardcodedUser.password) {
        return res.json({
          _id: 'hardcoded_' + normalizedEmail,
          fullName: hardcodedUser.fullName,
          email: normalizedEmail,
          role: hardcodedUser.role,
          companyName: 'KavyaMargin',
          token: generateToken('hardcoded_' + normalizedEmail)
        });
      } else {
        return res.status(401).json({ message: 'Invalid password for this role account' });
      }
    }

    // For any other email, treat as Viewers role with any password
    // This is NOT saved to the database as per user request
    return res.json({
      _id: 'viewer_' + normalizedEmail,
      fullName: normalizedEmail.split('@')[0] || 'Viewer',
      email: normalizedEmail,
      role: 'Viewers',
      companyName: 'KavyaMargin',
      token: generateToken('viewer_' + normalizedEmail)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private (Needs Middleware)
const getUserProfile = async (req, res) => {
  try {
    // Check if it's a hardcoded or viewer user from the request (token-based)
    // For now, return a generic user object if the token is valid
    if (req.user) {
      res.json({
        _id: req.user._id,
        fullName: req.user.fullName || 'User',
        email: req.user.email,
        role: req.user.role,
        companyName: 'KavyaMargin'
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
