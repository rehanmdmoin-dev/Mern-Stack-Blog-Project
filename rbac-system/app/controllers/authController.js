const authService = require('../services/authService');


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
};

class AuthController {
    async register(req, res) {
        const user = await authService.register(req.body);
        res.status(201).json({
            status: true,
            message: 'User registered successfully',
            data: user,
        });
    }

    async login(req, res) {
        const { accessToken, refreshToken, user } = await authService.login(req.body);

        res.cookie('accessToken',
            accessToken, {
            ...cookieOptions,
            maxAge: 60 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken,
            {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

        res.status(200).json({
            status: true,
            message: 'Login successful',
            accessToken,
            refreshToken,
            user,
        });
    }

    async refreshToken(req, res) {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        const { accessToken, refreshToken } = await authService.refresh(token);

        res.cookie('accessToken', accessToken,
            {
                ...cookieOptions,
                maxAge: 60 * 60 * 1000
            });
        res.cookie('refreshToken', refreshToken,
            {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

        res.status(200).json({
            status: true,
            message: 'Token refreshed successfully',
            accessToken,
            refreshToken,
        });
    }

    async logout(req, res) {
        await authService.logout(req.user._id);
        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        res.status(200).json({
            status: true,
            message: 'Logged out successfully'
        });
    }

    async getMe(req, res) {
        res.status(200).json({
            status: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                phone: req.user.phone,
                avatar: req.user.avatar,
                status: req.user.status,
            },
        });
    }
}

module.exports = new AuthController();
