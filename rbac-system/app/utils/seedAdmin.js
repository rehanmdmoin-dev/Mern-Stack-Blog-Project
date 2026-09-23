
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Role = require('../models/Role');

const DEFAULT_ROLES = [
    {
        name: 'admin',
        description: 'Full system control',
        permissions: ['create_users', 'delete_users', 'assign_roles', 'view_all_tasks', 'update_any_task', 'manage_managers', 'view_reports'],
    },
    {
        name: 'manager',
        description: 'Creates and assigns tasks to their team',
        permissions: ['create_tasks', 'assign_tasks', 'update_task_status', 'view_team_tasks', 'set_deadlines'],
    },
    {
        name: 'employee',
        description: 'Views and updates their own assigned tasks',
        permissions: ['view_own_tasks', 'update_own_task_progress', 'upload_attachments', 'mark_task_completed'],
    },
];

const seed = async () => {
    await connectDB();

    for (const role of DEFAULT_ROLES) {
        await Role.findOneAndUpdate({ name: role.name }, role, { upsert: true, new: true });
    }
    console.log('Role metadata seeded');

    const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const plainPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';
    const name = process.env.SEED_ADMIN_NAME || 'Super Admin';

    const existing = await User.findOne({ email });
    if (existing) {
        console.log(`Admin already exists with email: ${email}`);
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
    });

    console.log('Admin account created successfully:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Temporary Password: ${plainPassword}`);
    console.log('  Please log in and change this password.');

    await mongoose.connection.close();
    process.exit(0);
};

seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
