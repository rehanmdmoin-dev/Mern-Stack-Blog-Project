const Role = require('../models/Role');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');


class RoleController {
    async getAllRoles(req, res) {
        const roles = await Role.find();
        res.status(200).json({ status: true, count: roles.length, data: roles });
    }

    async upsertRole(req, res) {
        const { name, description, permissions } = req.body;

        const role = await Role.findOneAndUpdate(
            { name },
            { name, description, permissions },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ status: true, message: 'Role saved successfully', data: role });
    }

    async assignRole(req, res) {
        const { role } = req.body;

        const user = await User.findOne({ _id: req.params.userId, isDeleted: false });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            status: true,
            message: `Role updated to ${role} successfully`,
            data: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    };
}

module.exports = new RoleController();
