// zodSchemas.js
// Central Zod schemas for backend validation
const { z } = require('zod');

// User signup/login
const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  profilePic: z.string().optional()
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

// Blog
const blogCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  slug: z.string().min(1),
  images: z.array(z.string().url()).optional()
});

// Edition
const editionCreateSchema = z.object({
  editionNumber: z.string().min(1),
  title: z.string().min(1)
});

// Contact
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

// Newsletter
const newsletterSchema = z.object({
  email: z.string().email()
});

module.exports = {
  signupSchema,
  loginSchema,
  blogCreateSchema,
  editionCreateSchema,
  contactSchema,
  newsletterSchema
};
