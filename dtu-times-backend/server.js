
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
	origin: process.env.CORS_ORIGINS?.split(',') || '*',
	credentials: true
}));

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/edition', require('./routes/edition'));
app.use('/api/blog', require('./routes/blog'));

app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));

// PDF Proxy route for inline display
app.use('/api/pdf-proxy', require('./routes/pdf-proxy'));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});
