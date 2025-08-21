---
applyTo: '**'
---
## 1. Database Schema & Backend Setup

### 1.1. User Schema & Auth
- Design User schema: profilePic, email, name, password, status (Verified/Unverified/Rejected)
- Set up authentication (JWT or session-based)
- Add admin/editor roles for access control

### 1.2. Edition Schema
- Design Edition schema: editionNumber, pdfUrl, coverPicUrl, uploadDate, uploadedBy
- Add fields for featured/starred status

### 1.3. Blog Schema
- Design Blog schema: title, content, authorName, uploadDateTime, images, slug
- Add fields for featured/starred status

---

## 2. Authentication & User Management

### 2.1. Signup Flow
- Create signup page (email input)
- On submit, send email to admin and store user as Unverified
- Admin can set status to Verified/Unverified/Rejected in DB

### 2.2. Login Flow
- Create login page (email & password)
- Allow login only for Verified users

### 2.3. Profile Section
- Show profile section in navbar for logged-in users
- Display Name, Profile Pic, Email (email is fixed/readonly)

---

## 3. Edition Management

### 3.1. Add Magazine (Edition)
- Show "Add Magazine" card/button for editors/logged-in users
- On click, open form to upload PDF, cover pic, and enter edition number
- Store files in Cloudinary, save metadata in DB

### 3.2. Edition Cards & Controls
- Display editions as cards
- Show delete, star/unstar, and feature controls for editors

### 3.3. Edition Search
- Add search bar to edition page
- Allow users to search by edition number and display the corresponding PDF

### 3.4. Edition View Modes
- Implement Magazine Mode (horizontal flip)
- Implement Scroll Mode (vertical scroll)
- Allow user to toggle between modes

---

## 4. Blog Management

### 4.1. Add Blog
- Show "Add Blog" card/button
- On click, open blog editor page (modern rich text editor)
- Allow upload of images, set author name automatically, auto-set upload date

### 4.2. Blog Display
- After upload, display blog at /blogs/[blog-slug]
- Show blog content, images, author, date

### 4.3. Blog Edit/Delete
- On blog detail page, show edit (pen) and delete buttons for editors

---

## 5. Contact Us

### 5.1. Contact Form
- Create contact form (name, email, message)
- On submit, send email to admin with form contents

---

## 6. UI/UX & Access Control

### 6.1. Role-Based Access
- Restrict add/edit/delete features to editors/admins
- Hide controls for regular users

### 6.2. Responsive & Accessible UI
- Ensure all pages are responsive and accessible
- Use consistent design system