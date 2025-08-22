const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter - subscribe
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  try {
    // Save email if not already present
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already subscribed.' });
    }
    await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
