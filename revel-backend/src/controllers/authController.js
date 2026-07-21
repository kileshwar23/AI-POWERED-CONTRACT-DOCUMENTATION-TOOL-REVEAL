const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecret_revel_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_revel_key_2026', {
    expiresIn: '90d',
  });
};

// 1. POST /register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. POST /login
const login = async (req, res) => {
  console.log('Login attempt started:', req.body.email);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('Finding user in DB...');
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User found:', !!user);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('Password matched, sending response...');
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// 3. POST /logout
const logout = async (req, res) => {
  // Stateless JWT — client should discard tokens. 
  // If you add a token blacklist later, invalidate here.
  res.json({ message: 'User logged out successfully' });
};

// 4. POST /refresh-token  — Fix: actually verifies the refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(400).json({ message: 'Refresh token is required' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_revel_key_2026');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    res.json({
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// 5. GET /profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. PUT /profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    // Only update email if different, check for duplicate
    if (req.body.email && req.body.email.toLowerCase() !== user.email) {
      const emailTaken = await User.findOne({ email: req.body.email.toLowerCase() });
      if (emailTaken) return res.status(400).json({ message: 'Email already in use' });
      user.email = req.body.email.toLowerCase();
    }
    if (req.body.profilePicture !== undefined) user.profilePicture = req.body.profilePicture;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.bio !== undefined) user.bio = req.body.bio;
    if (req.body.role !== undefined) user.role = req.body.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. PUT /change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    if (!currentPassword || !password) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. DELETE /account
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout, refreshToken, getProfile, updateProfile, changePassword, deleteAccount };
