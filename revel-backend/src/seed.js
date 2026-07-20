const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@revel.ai' });
    if (existing) {
      console.log('✅ Admin user already exists — skipping seed');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    await User.create({
      name: 'Admin',
      email: 'admin@revel.ai',
      password: hashedPassword,
      role: 'ADMIN',
    });

    console.log('🌱 Admin user seeded:');
    console.log('   Email   : admin@revel.ai');
    console.log('   Password: Admin@123');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
};

module.exports = { seedAdmin };
