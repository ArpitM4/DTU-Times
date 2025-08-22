
const express = require('express');
const router = express.Router();
const Edition = require('../models/Edition');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../utils/cloudinary');

// Add new edition (editor/admin only, with file upload)
router.post('/', auth, upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverPic', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    const { editionNumber, title } = req.body;
    if (!editionNumber || !req.files?.pdf || !req.files?.coverPic) return res.status(400).json({ message: 'All fields required' });
    const exists = await Edition.findOne({ editionNumber });
    if (exists) return res.status(409).json({ message: 'Edition number already exists' });
  // Remove unused upload_stream calls with throw error (handled below with Promises)
    // Actually upload
    const pdfResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'raw', folder: 'editions' }, (err, result) => {
        if (err) reject(err); else resolve(result);
      });
      stream.end(req.files.pdf[0].buffer);
    });
    const coverResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'editions/covers' }, (err, result) => {
        if (err) reject(err); else resolve(result);
      });
      stream.end(req.files.coverPic[0].buffer);
    });
    const edition = await Edition.create({
      editionNumber,
      title,
      pdfUrl: pdfResult.secure_url,
      coverPicUrl: coverResult.secure_url,
      uploadedBy: req.user._id
    });
    res.status(201).json({ edition });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all editions (public)
router.get('/', async (req, res) => {
  const editions = await Edition.find().sort({ editionNumber: -1 });
  res.json({ editions });
});

// Search by edition number
router.get('/search', async (req, res) => {
  const { editionNumber } = req.query;
  if (!editionNumber) return res.status(400).json({ message: 'Edition number required' });
  const edition = await Edition.findOne({ editionNumber: Number(editionNumber) });
  if (!edition) return res.status(404).json({ message: 'Edition not found' });
  res.json({ edition });
});

// Delete edition (editor/admin only)
router.delete('/:id', auth, async (req, res) => {
  if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const edition = await Edition.findByIdAndDelete(req.params.id);
  if (!edition) return res.status(404).json({ message: 'Edition not found' });
  res.json({ message: 'Edition deleted' });
});

// Star/unstar and feature/unfeature edition (editor/admin only)
router.patch('/:id', auth, async (req, res) => {
  if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const { isStarred, isFeatured } = req.body;
  const edition = await Edition.findByIdAndUpdate(
    req.params.id,
    { $set: { ...(isStarred !== undefined && { isStarred }), ...(isFeatured !== undefined && { isFeatured }) } },
    { new: true }
  );
  if (!edition) return res.status(404).json({ message: 'Edition not found' });
  res.json({ edition });
});

module.exports = router;
