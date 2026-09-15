// Usage: authorize('admin'), authorize('admin', 'author')
// Must run after `protect`, since it relies on req.user being set.
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ status: false, message: 'Not authorized, please log in' });
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      status: false,
      message: `Role '${req.user.role}' is not permitted to perform this action`,
    });
  }
  next();
};

module.exports = authorize;
