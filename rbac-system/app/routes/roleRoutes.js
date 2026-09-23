const express = require('express');
const roleController = require('../controllers/roleController');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { assignRoleValidation } = require('../validations/userValidation');

const router = express.Router();

router.use(authenticate, authorizeRoles('admin'));

router.get('/get', roleController.getAllRoles);
router.post('/upsert', roleController.upsertRole);
router.patch('/assign/:userId', validate(assignRoleValidation), roleController.assignRole);

module.exports = router;
