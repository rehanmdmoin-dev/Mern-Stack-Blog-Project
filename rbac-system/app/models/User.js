const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'employee'],
            default: 'employee',
            required: true,
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            select: false,
            default: null,
        },
    },
    { timestamps: true }
);

userSchema.query.active = function () {
    return this.where({ isDeleted: false });
};

module.exports = mongoose.model('User', userSchema);
