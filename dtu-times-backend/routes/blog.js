
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../utils/cloudinary');

// Add new blog (editor/admin only, with image upload)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    const { title, content, slug } = req.body;
    if (!title || !content || !slug) return res.status(400).json({ message: 'All fields required' });
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'blogs' }, (err, result) => {
            if (err) reject(err); else resolve(result);
          });
          stream.end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }
    const blog = await Blog.create({
      title,
      content,
      images: imageUrls,
      slug,
      authorName: req.user.name,
      uploadDateTime: new Date()
    });
    res.status(201).json({ blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all blogs (public)
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ uploadDateTime: -1 });
  res.json({ blogs });
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ blog });
});

// Edit blog (editor/admin only, with image upload)
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
  if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const { title, content, isStarred, isFeatured } = req.body;
  let imageUrls = req.body.images || [];
  if (req.files && req.files.length > 0) {
    imageUrls = [];
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'blogs' }, (err, result) => {
          if (err) reject(err); else resolve(result);
        });
        stream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }
  }
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { title, content, images: imageUrls, isStarred, isFeatured } },
    { new: true }
  );
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ blog });
});

// Star/unstar and feature/unfeature blog (editor/admin only)
router.patch('/:id', auth, async (req, res) => {
  if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const { isStarred, isFeatured } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { ...(isStarred !== undefined && { isStarred }), ...(isFeatured !== undefined && { isFeatured }) } },
    { new: true }
  );
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ blog });
});

// Delete blog (editor/admin only)
router.delete('/:id', auth, async (req, res) => {
  if (!['editor', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Blog deleted' });
});

module.exports = router;
