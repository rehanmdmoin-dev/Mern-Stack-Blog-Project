const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        throw new ApiError(401, 'Not authorized, no token provided');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new ApiError(401, 'Not authorized, invalid or expired token');
    }

    const user = await User.findOne({ _id: decoded.id, isDeleted: false });
    if (!user) {
        throw new ApiError(401, 'Not authorized, user no longer exists');
    }
    if (user.status === 'inactive') {
        throw new ApiError(403, 'Your account has been deactivated');
    }

    req.user = user;
    next();
});

module.exports = authenticate;
