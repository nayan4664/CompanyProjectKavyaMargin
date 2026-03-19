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
  try {
    const { fullName, email, password, role, companyName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ fullName, email, password, role, companyName });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

    // If it's one of the specific role emails, verify password
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

    // For any other email, check the database
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.comparePassword(password))) {
      return res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        token: generateToken(user._id)
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private (Needs Middleware)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyName: user.companyName
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
