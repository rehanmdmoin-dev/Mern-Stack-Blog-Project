const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { registerValidation, loginValidation } = require('../validations/authValidation');

const router = express.Router();

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/refresh-token', authController.refreshToken);

router.use(authenticate);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);

module.exports = router;
