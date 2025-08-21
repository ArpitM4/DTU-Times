const mongoose = require('mongoose');

const editionSchema = new mongoose.Schema({
  editionNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: ''
  },
  pdfUrl: {
    type: String,
    required: true
  },
  coverPicUrl: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Edition', editionSchema);
