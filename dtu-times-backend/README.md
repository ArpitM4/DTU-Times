# DTU Times Backend

Node.js + Express.js backend for DTU Times digital magazine platform.

## Folder Structure

```
dtu-times-backend/
├── controllers/          # Business logic handlers
├── models/              # Database schemas and models
├── routes/              # API route definitions
├── middleware/          # Custom middleware functions
├── config/              # Configuration files
├── utils/               # Utility functions and helpers
├── uploads/             # File upload storage
│   ├── images/          # Image uploads
│   └── pdfs/            # PDF uploads
├── public/              # Static files
├── server.js            # Main server entry point
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variables template
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## API Endpoints (To be implemented)

- `/api/auth` - Authentication routes
- `/api/blogs` - Blog management
- `/api/editions` - Magazine editions
- `/api/gallery` - Gallery management
- `/api/users` - User management
- `/api/upload` - File upload handling
