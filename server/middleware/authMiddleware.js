const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // Check if it's a hardcoded or viewer user
      if (decoded.id.startsWith('hardcoded_') || decoded.id.startsWith('viewer_')) {
        const type = decoded.id.startsWith('hardcoded_') ? 'hardcoded' : 'viewer';
        const email = decoded.id.replace('hardcoded_', '').replace('viewer_', '');
        
        req.user = {
          _id: decoded.id,
          email: email,
          role: type === 'hardcoded' ? 'Admin' : 'Viewers' // Simplified for middleware
        };
      } else {
        // Get user from the token (Database fallback)
        req.user = await User.findById(decoded.id).select('-password');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
