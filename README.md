

# 📰 DTU Times - Digital Magazine Platform

A modern, full-stack digital magazine platform for Delhi Technological University, featuring a Next.js/Tailwind CSS frontend and a robust Node.js/Express/MongoDB backend. Includes authentication, content management, PDF viewer, and advanced validation.

## 🌟 Features

### 🎨 Design & UI/UX

### 🎨 Frontend (Next.js)
- **Dark/Light Theme Toggle** - Seamless theme switching with CSS variables
- **Responsive Design** - Mobile-first, cross-device compatibility
- **Modern UI/UX** - Teal accent, glassmorphism, smooth animations
- **Smart Navbar & Sidebar** - Auto-hide, active link indicators, mobile menu
- **Blog System** - Interactive listing, featured slider, star/bookmark, category organization
- **Blog Post Details** - Immersive hero, reading progress, author bio, related posts, social sharing
- **Editions Archive** - PDF magazine viewer, grid layout, full-screen reader
- **Gallery** - Masonry grid, lightbox, categorized sections
- **Contact & About Pages** - Professional forms, info, and validation
- **Newsletter** - Floating subscribe button, modal, animation
- **Authentication** - Editor login/signup, client-side validation, protected routes
- **Error Handling** - Graceful fallbacks for images/content

### 🏠 Homepage
- **RESTful API** - CRUD for blogs, editions, users, contact, newsletter
- **Authentication** - JWT-based, role-based access (admin/editor/user)
- **File Uploads** - Cloudinary integration for images, PDFs
- **Data Validation** - Zod schemas for all major endpoints (signup, login, blog, edition, contact, newsletter)
- **Security** - Password hashing, input validation, CORS, rate limiting (recommended)
- **Admin Controls** - User verification, edition/blog moderation
- **Email Integration** - Nodemailer for contact/notification
- **Error Handling** - Consistent API error responses
- **Full-Screen Hero Sections** - Immersive landing experience
- **Smart Navigation Arrows** - Section-by-section scrolling with smooth transitions
- **Next.js 15.4.7** - App Router, SSR, image optimization
- **Component Architecture** - Modular, reusable, scalable
- **TypeScript Ready** - JavaScript with migration path
- **CSS Variables & Tailwind** - Dynamic theming, utility-first styling
- **API Integration** - Frontend-backend separation, RESTful calls
- **Mobile-Optimized** - Hidden scroll arrows on mobile with touch-friendly interface
- **Dynamic Theme Integration** - Consistent theming across all sections

### 🧭 Navigation & Header
- **Smart Navbar** - Auto-hide on scroll with smooth reveal
- **Active Link Indicators** - Underline highlights for current page
- **Mobile Sidebar** - Collapsible hamburger menu with smooth animations
- **Cross-Platform Consistency** - Uniform navigation experience

### 📚 Blog System
- **Interactive Blog Listing** - Grid layout with hover effects
- **Star/Bookmark System** - Save favorite posts with visual feedback
- **Featured Blog Slider** - Horizontal scrolling with navigation arrows
- **Touch Swipe Support** - Mobile-friendly slider navigation
- **Category-Based Organization** - Organized content structure
- **Rich Content Display** - Professional article previews

### 📖 Blog Post Details
- **Immersive Reading Experience** - Full-screen hero with overlay text
- **Reading Progress Tracker** - Dynamic progress bar showing completion
- **Floating Action Buttons** - Like, bookmark, and share functionality
- **Author Bio Sections** - Professional author information display
- **Related Posts** - Intelligent content recommendations
- **Social Sharing** - Native sharing API with clipboard fallback
- **Rich Text Content** - Full HTML rendering with typography styles

### 📄 Content Pages
- **Editions Archive** - PDF magazine viewer with grid layout
- **Edition Reader** - Full-screen PDF viewer with navigation controls
- **Gallery Showcase** - Masonry grid with lightbox functionality
- **Contact Us** - Professional contact information and forms
- **About Page** - Clean, artistic about section

### 📱 Interactive Features
- **Newsletter Subscription** - Floating action button with modal
- **Newsletter Animations** - Shake and pulse effects for engagement
- **PDF View Modes** - Toggle between fit-to-page and full-width viewing
- **Image Lightbox** - Full-screen image viewer with keyboard navigation
- **Error Handling** - Graceful fallbacks for images and content

### 🔐 Authentication (Ready for Implementation)
- **Editor Login/Signup** - Authentication pages for content creators
- **Form Validation** - Client-side validation ready
- **Responsive Auth Forms** - Mobile-optimized login/signup interface

### 🖼️ Gallery System
- **Categorized Sections** - Campus Life, Events, Achievements, Faculty
- **Masonry Grid Layout** - Pinterest-style image arrangement
- **Loading States** - Smooth image loading with placeholders
- **Error Handling** - Fallback images for failed loads
- **Enhanced Lightbox** - Professional image viewing experience

### ⚡ Performance & Technical
- **Next.js 15.4.7** - Latest framework with App Router
- **Server-Side Rendering** - SEO-optimized rendering
- **Image Optimization** - Automatic image compression and formats
- **CSS Variables** - Dynamic theming system
- **Component Architecture** - Modular, reusable components
- **TypeScript Ready** - JavaScript with migration path to TypeScript


## 🏗️ Project Structure

```
dtu-times/
├── src/
│   ├── app/                # Next.js frontend (pages, layouts, routes)
│   ├── components/         # Reusable React components
│   ├── context/            # React context (theme, auth)
├── public/                 # Static assets (images, icons, etc)
├── dtu-times-backend/      # Express backend API
│   ├── models/             # Mongoose models (User, Blog, Edition, etc)
│   ├── routes/             # Express routes (auth, blog, edition, contact, etc)
│   ├── middleware/         # Auth, upload, error handling
│   ├── utils/              # Utility functions (hash, jwt, cloudinary)
│   ├── zodSchemas.js       # Central Zod validation schemas
│   └── server.js           # Express app entry point
├── .eslintrc.json          # ESLint configuration
├── jsconfig.json           # JS config
├── next.config.js          # Next.js config
├── package.json            # Dependencies
├── README.md               # Project documentation
└── tailwind.config.js      # Tailwind CSS config
```

## 🎨 Design System

### Color Palette
- **Primary Accent**: `#14b8a6` (Teal)
- **Accent Hover**: `#0f9488` (Dark Teal)
- **Theme Variables**: CSS custom properties for dynamic theming

### Typography
- **Font**: System font stack with fallbacks
- **Hierarchy**: Consistent heading sizes and weights
- **Spacing**: Uniform margin and padding scales

### Components
- **Buttons**: Consistent hover states and transitions
- **Cards**: Unified border radius and shadow styles
- **Forms**: Standardized input styling and validation


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dtu-times
   ```

2. **Install dependencies (frontend & backend)**
   ```bash
   npm install
   cd dtu-times-backend
   npm install
   cd ..
   ```

3. **Configure environment variables**
   - Create `.env` files for both frontend and backend as needed (see sample.env)

4. **Run backend API**
   ```bash
   cd dtu-times-backend
   npm start
   ```

5. **Run frontend (Next.js)**
   ```bash
   cd ..
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
cd dtu-times-backend && npm start & cd .. && npm run build && npm start
```


## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.7 (App Router)
- **Styling**: Tailwind CSS, CSS variables
- **Language**: JavaScript (TypeScript ready)
- **State Management**: React Context, useState
- **Deployment**: Vercel (recommended)

### Backend
- **Framework**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Zod (robust schema validation)
- **Authentication**: JWT, role-based access
- **File Uploads**: Multer, Cloudinary
- **Email**: Nodemailer
- **Security**: bcrypt, CORS, input validation

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)


## 🎯 Future Enhancements

- [ ] CMS integration (Strapi, Sanity, etc)
- [ ] Advanced user profiles & permissions
- [ ] Comment system for blogs
- [ ] Full-text search (Elastic, MongoDB Atlas)
- [ ] Push notifications
- [ ] Offline/PWA support
- [ ] Multi-language (i18n)
- [ ] Analytics dashboard
- [ ] Rate limiting, security hardening

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@dtutimes.com or join our Slack channel.

---

**Built with ❤️ for Delhi Technological University**
