const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

const { signup, login, signupClient, loginClient } = require('./controllers/authController');

const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;  

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user', 
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      data: {
        token,
        role: newUser.role,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup-client', signupClient);
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      data: {
        token,
        role: user.role,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Login Error:", error); // For debugging
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/loginclient', loginClient);

router.get('/client-dashboard', verifyToken, authorizeRole('client'), (req, res) => {
  res.status(200).json({ message: "Welcome to your client dashboard!" });
});
router.get('/client-specific-data', verifyToken, authorizeRole('client'), (req, res) => {
  res.status(200).json({ message: "Access to client-specific data!" });
});

module.exports = router;
