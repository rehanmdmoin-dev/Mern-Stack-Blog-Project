const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verifies the JWT and attaches the authenticated user to req.user
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ status: false, message: 'Access denied. No token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: false, message: 'Not authorized, user no longer exists' });
    }
    if (!user.isActive) {
      return res.status(403).json({ status: false, message: 'This account has been deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
};

// Optional auth: attaches req.user if a valid token is present, but doesn't fail otherwise.
// Useful for endpoints (like public blog view) that behave differently for logged-in users.
const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return next();
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user && user.isActive) req.user = user;
    next();
  } catch (error) {
    // Ignore invalid token for optional auth — request continues unauthenticated.
    next();
  }
};

module.exports = { protect, optionalAuth };
