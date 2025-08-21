const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/pdf-proxy?url=...
router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url parameter' });
  try {
    // Stream the PDF from Cloudinary (or any URL)
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="magazine.pdf"');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PDF' });
  }
});

module.exports = router;
