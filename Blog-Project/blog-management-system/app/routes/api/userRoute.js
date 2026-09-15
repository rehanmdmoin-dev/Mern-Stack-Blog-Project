const express = require('express');
const { protect } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const UserController = require('../../controller/api/UserController');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id/activate', UserController.activateUser);
router.put('/:id/deactivate', UserController.deactivateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
