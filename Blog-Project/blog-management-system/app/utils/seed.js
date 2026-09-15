// Seeds an initial admin account plus a couple of sample categories/tags.
// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/user');
const Category = require('../models/category');
const Tag = require('../models/tag');

const seed = async () => {
  await connectDB();

  const adminEmail = 'admin@example.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Site Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
    });
    console.log(`Created admin user: ${adminEmail} / Admin@123`);
  } else {
    if (!existingAdmin.isEmailVerified) {
      existingAdmin.isEmailVerified = true;
      await existingAdmin.save({ validateBeforeSave: false });
    }
    console.log('Admin user already exists, skipping');
  }

  const categories = ['Technology', 'Lifestyle', 'Travel', 'Business'];
  for (const name of categories) {
    const exists = await Category.findOne({ name });
    if (!exists) await Category.create({ name, description: `${name} related posts` });
  }
  console.log('Seeded categories');

  const tags = ['nodejs', 'mongodb', 'javascript', 'tutorial'];
  for (const name of tags) {
    const exists = await Tag.findOne({ name });
    if (!exists) await Tag.create({ name });
  }
  console.log('Seeded tags');

  await mongoose.connection.close();
  console.log('Seeding complete');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
