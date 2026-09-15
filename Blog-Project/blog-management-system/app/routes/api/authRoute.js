const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const AuthController = require('../../controller/api/AuthController');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'author', 'reader']).withMessage('Role must be admin, author, or reader'),
  ],
  validate,
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  AuthController.login
);

router.post(
  '/verify-email',
  [body('email').isEmail().withMessage('Valid email is required'), body('otp').matches(/^\d{6}$/).withMessage('OTP must be 6 digits')],
  validate,
  AuthController.verifyEmail
);

router.post(
  '/resend-verification',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  AuthController.resendVerification
);

router.get('/me', protect, AuthController.getMe);

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  validate,
  AuthController.changePassword
);

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  AuthController.forgotPassword
);

router.put(
  '/reset-password/:token',
  [body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],
  validate,
  AuthController.resetPassword
);

module.exports = router;
