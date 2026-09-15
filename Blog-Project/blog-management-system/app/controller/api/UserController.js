const User = require('../../models/user');
const getPagination = require('../../utils/paginate');

class UserController {
  // GET /api/users — Private/Admin — search + filter + paginate
  async getUsers(req, res) {
    try {
      const { search, role, isActive } = req.query;
      const { skip, limit, buildMeta } = getPagination(req.query);

      const filter = {};
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }
      if (role) filter.role = role;
      if (isActive !== undefined) filter.isActive = isActive === 'true';

      const [users, total] = await Promise.all([
        User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        User.countDocuments(filter),
      ]);

      return res.status(200).json({
        status: true,
        data: users.map((u) => u.toSafeObject()),
        meta: buildMeta(total),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/users/:id — Private/Admin
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      return res.status(200).json({ status: true, data: user.toSafeObject() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/users/:id/activate — Private/Admin
  async activateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      return res.status(200).json({ status: true, message: 'User activated', data: user.toSafeObject() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/users/:id/deactivate — Private/Admin
  async deactivateUser(req, res) {
    try {
      if (req.params.id === String(req.user._id)) {
        return res.status(400).json({ status: false, message: 'You cannot deactivate your own account' });
      }
      const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      return res.status(200).json({ status: true, message: 'User deactivated', data: user.toSafeObject() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/users/:id — Private/Admin
  async deleteUser(req, res) {
    try {
      if (req.params.id === String(req.user._id)) {
        return res.status(400).json({ status: false, message: 'You cannot delete your own account' });
      }
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      return res.status(200).json({ status: true, message: 'User deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new UserController();
