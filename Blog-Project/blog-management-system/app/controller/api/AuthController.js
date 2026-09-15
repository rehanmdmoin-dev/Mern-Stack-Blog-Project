const crypto = require('crypto');
const User = require('../../models/user');
const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');

const createOtp = () => String(crypto.randomInt(100000, 1000000));
const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');
const otpExpiry = () => Date.now() + (Number(process.env.EMAIL_OTP_EXPIRES_MIN) || 10) * 60 * 1000;

const issueEmailOtp = async (user) => {
  const otp = createOtp();
  user.emailVerificationOtp = hashOtp(otp);
  user.emailVerificationExpires = otpExpiry();
  await user.save({ validateBeforeSave: false });

  const sent = await sendEmail({
    to: user.email,
    subject: 'Verify your Ledger account',
    text: `Your Ledger verification code is ${otp}. It expires in ${Number(process.env.EMAIL_OTP_EXPIRES_MIN) || 10} minutes.`,
    html: `<p>Your Ledger verification code is <strong>${otp}</strong>.</p><p>It expires in ${Number(process.env.EMAIL_OTP_EXPIRES_MIN) || 10} minutes.</p>`,
  });

  return { sent, otp };
};

class AuthController {
  // POST /api/auth/register — Public
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ status: false, message: 'Email is already registered' });
      }

      const allowedRole = ['admin', 'author', 'reader'].includes(role) ? role : 'reader';

      const user = await User.create({ name, email, password, role: allowedRole });
      const { sent, otp } = await issueEmailOtp(user);

      return res.status(201).json({
        status: true,
        message: 'Registration successful. Check your email for the verification code.',
        data: {
          email: user.email,
          expiresAt: user.emailVerificationExpires,
          devOtp: !sent && process.env.NODE_ENV === 'development' ? otp : undefined,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Unable to register. Please try again later.' });
    }
  }

  // POST /api/auth/login — Public
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ status: false, message: 'Invalid email or password' });
      }
      if (!user.isEmailVerified) {
        return res.status(403).json({ status: false, code: 'EMAIL_NOT_VERIFIED', message: 'Please verify your email before signing in' });
      }
      if (!user.isActive) {
        return res.status(403).json({ status: false, message: 'This account has been deactivated' });
      }

      const token = generateToken(user._id, user.role);

      return res.status(200).json({
        status: true,
        message: 'Login successful',
        data: { user: user.toSafeObject(), token },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // POST /api/auth/verify-email — Public
  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email }).select('+emailVerificationOtp +emailVerificationExpires');
      if (!user || user.isEmailVerified || !user.emailVerificationOtp || !user.emailVerificationExpires || user.emailVerificationExpires < Date.now() || user.emailVerificationOtp !== hashOtp(otp)) {
        return res.status(400).json({ status: false, message: 'The verification code is invalid or has expired' });
      }

      user.isEmailVerified = true;
      user.emailVerificationOtp = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });
      const token = generateToken(user._id, user.role);
      return res.status(200).json({ status: true, message: 'Email verified successfully', data: { user: user.toSafeObject(), token } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Unable to verify email' });
    }
  }

  // POST /api/auth/resend-verification — Public
  async resendVerification(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || user.isEmailVerified) {
        return res.status(200).json({ status: true, message: 'If the account needs verification, a new code has been sent' });
      }
      const { sent, otp } = await issueEmailOtp(user);
      return res.status(200).json({ status: true, message: 'A new verification code has been sent', data: { email: user.email, devOtp: !sent && process.env.NODE_ENV === 'development' ? otp : undefined } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Unable to resend verification code' });
    }
  }

  // GET /api/auth/me — Private
  async getMe(req, res) {
    try {
      return res.status(200).json({ status: true, data: req.user.toSafeObject() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/auth/change-password — Private
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id).select('+password');
      if (!(await user.comparePassword(currentPassword))) {
        return res.status(401).json({ status: false, message: 'Current password is incorrect' });
      }

      user.password = newPassword;
      await user.save();

      return res.status(200).json({ status: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // POST /api/auth/forgot-password — Public
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      // Respond the same way whether or not the user exists, to avoid leaking which emails are registered.
      if (!user) {
        return res.status(200).json({
          status: true,
          message: 'If that email is registered, a reset link has been sent',
        });
      }

      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // In a real app this would be emailed. For this project scope we return it directly.
      return res.status(200).json({
        status: true,
        message: 'If that email is registered, a reset link has been sent',
        devResetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/auth/reset-password/:token — Public
  async resetPassword(req, res) {
    try {
      const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ status: false, message: 'Reset token is invalid or has expired' });
      }

      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      const token = generateToken(user._id, user.role);
      return res.status(200).json({ status: true, message: 'Password reset successful', data: { token } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new AuthController();
