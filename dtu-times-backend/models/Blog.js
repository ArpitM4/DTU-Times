const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  uploadDateTime: {
    type: Date,
    default: Date.now
  },
  images: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Blog', blogSchema);
