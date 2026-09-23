const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const getPagination = require('../utils/pagination');

class UserController {
    
    async createUser(req, res) {
        const { name, email, password, role, phone } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            throw new ApiError(400, 'A user with this email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, role, phone });

        res.status(201).json({
            status: true,
            message: 'User created successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }

    async getAllUsers(req, res) {
        const filter = { isDeleted: false };
        if (req.query.role) filter.role = req.query.role;
        if (req.query.status) filter.status = req.query.status;

        const { skip, limit, buildMeta } = getPagination(req.query);

        const [users, total] = await Promise.all([
            User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            User.countDocuments(filter),
        ]);

        res.status(200).json({
            status: true,
            ...buildMeta(total),
            users,
        });
    };

    async getUserById(req, res) {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false });
        if (!user) throw new ApiError(404, 'User not found');
        res.status(200).json({ status: true, user });
    };


    async updateUser(req, res) {
        const { name, email, phone } = req.body;

        const user = await User.findOne({ _id: req.params.id, isDeleted: false });
        if (!user) throw new ApiError(404, 'User not found');

        if (email && email !== user.email) {
            const taken = await User.findOne({ email });
            if (taken) throw new ApiError(400, 'Email already in use');
            user.email = email;
        }
        if (name) user.name = name;
        if (phone) user.phone = phone;

        await user.save();
        res.status(200).json({ status: true, message: 'User updated successfully', user });
    };


    async softDeleteUser(req, res) {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false });
        if (!user) throw new ApiError(404, 'User not found');

        user.isDeleted = true;
        await user.save();

        res.status(200).json({ status: true, message: 'User deleted successfully' });
    };

  
    async toggleStatus(req, res) {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false });
        if (!user) throw new ApiError(404, 'User not found');

        user.status = user.status === 'active' ? 'inactive' : 'active';
        await user.save();

        res.status(200).json({
            status: true,
            message: `User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully`,
            user,
        });
    }
}

module.exports = new UserController();
