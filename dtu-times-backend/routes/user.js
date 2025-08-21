
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// List all users (admin only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const users = await User.find();
  res.json({ users });
});

// Update user status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { status } = req.body;
  if (!['Verified', 'Unverified', 'Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  res.json({ user: req.user });
});
// Alias for frontend compatibility
router.get('/profile', auth, async (req, res) => {
  res.json({ user: req.user });
});

// Admin: verify, unverify, or reject user
router.patch('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { status } = req.body;
  if (!['verified', 'pending', 'rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

module.exports = router;
