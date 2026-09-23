const ApiError = require('../utils/ApiError');


const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, 'Not authenticated');
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, `Access denied. Requires role: ${allowedRoles.join(' or ')}`);
        }
        next();
    };
};

module.exports = authorizeRoles;
