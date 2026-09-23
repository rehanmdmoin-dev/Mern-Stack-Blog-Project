const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

class AuthService {
    async register({ name, email, password, phone }) {
        const existing = await User.findOne({ email });
        if (existing) {
            throw new ApiError(400, 'A user with this email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'employee',
            phone,
        });

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    async login({ email, password }) {
        const user = await User.findOne({ email, isDeleted: false }).select('+password');
        if (!user) {
            throw new ApiError(401, 'Invalid email or password');
        }
        if (user.status === 'inactive') {
            throw new ApiError(403, 'Your account has been deactivated. Contact an admin.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(401, 'Invalid email or password');
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const salt = await bcrypt.genSalt(10);
        user.refreshToken = await bcrypt.hash(refreshToken, salt);
        await user.save();

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async refresh(refreshTokenFromCookie) {
        if (!refreshTokenFromCookie) {
            throw new ApiError(401, 'No refresh token provided');
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshTokenFromCookie, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            throw new ApiError(401, 'Invalid or expired refresh token. Please log in again.');
        }

        const user = await User.findOne({ _id: decoded.id, isDeleted: false }).select('+refreshToken');
        if (!user || !user.refreshToken) {
            throw new ApiError(401, 'Session not found. Please log in again.');
        }

        const isMatch = await bcrypt.compare(refreshTokenFromCookie, user.refreshToken);
        if (!isMatch) {
            throw new ApiError(403, 'Refresh token mismatch. Please log in again.');
        }

       
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        const salt = await bcrypt.genSalt(10);
        user.refreshToken = await bcrypt.hash(newRefreshToken, salt);
        await user.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    async logout(userId) {
        await User.findByIdAndUpdate(userId, { refreshToken: null });
    }
}

module.exports = new AuthService();
