const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'author', 'reader'],
      default: 'reader',
    },
    bio: { type: String, maxlength: 500, default: '' },
    profileImage: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true }, // authors can require admin approval
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationOtp: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    readingHistory: [
      {
        blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const minutes = Number(process.env.RESET_TOKEN_EXPIRES_MIN) || 30;
  this.passwordResetExpires = Date.now() + minutes * 60 * 1000;
  return resetToken;
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.emailVerificationOtp;
  delete obj.emailVerificationExpires;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
