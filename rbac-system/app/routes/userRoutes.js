const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { createUserValidation, updateUserValidation } = require('../validations/userValidation');

const router = express.Router();

router.use(authenticate);


router.post('/', authorizeRoles('admin'), validate(createUserValidation), userController.createUser);
router.get('/', authorizeRoles('admin', 'manager'), userController.getAllUsers);
router.get('/:id', authorizeRoles('admin', 'manager'), userController.getUserById);
router.put('/:id', authorizeRoles('admin'), validate(updateUserValidation), userController.updateUser);
router.delete('/:id', authorizeRoles('admin'), userController.softDeleteUser);
router.patch('/:id/status', authorizeRoles('admin'), userController.toggleStatus);

module.exports = router;
