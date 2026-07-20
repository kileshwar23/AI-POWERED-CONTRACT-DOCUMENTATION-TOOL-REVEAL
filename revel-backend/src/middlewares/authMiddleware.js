const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fix: fetch full user from DB so req.user has role, name, email etc.
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_revel_key_2026');

      // Fetch user from DB to get role and latest data (exclude password)
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
  if (req.user && adminRoles.includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized as an admin' });
};

module.exports = { protect, admin };
