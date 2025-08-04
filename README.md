# 🌐 Mini-LinkedIn Community Platform

A full-stack professional networking platform built with modern web technologies, featuring real-time interactions, cloud-based image storage, and responsive design.

**👤 Demo Account:**
- **Email:** `abhijeet@gmail.com`
- **Password:** `12345678`

## 📱 Features

### ✨ Core Features
- 🔐 **User Authentication** - Secure JWT-based login/registration
- 👤 **User Profiles** - Customizable profiles with bio and profile pictures
- 📝 **Post Creation** - Create posts with text and images
- 🖼️ **Image Upload** - Cloud-based image storage with Cloudinary
- 📱 **Responsive Design** - Mobile-first design for all devices
- 🗑️ **Post Management** - Delete your own posts
- 👥 **Community Feed** - View all community posts in real-time

### 🎯 Advanced Features
- ☁️ **Cloud Storage** - Automatic image optimization and CDN delivery
- 🎨 **Smart Image Processing** - Auto-cropping, compression, and format conversion
- 📱 **Mobile Optimized** - Touch-friendly interface with proper tap targets
- 🔒 **Security** - Rate limiting, CORS protection, and input validation
- ⚡ **Performance** - Optimized loading and caching strategies
- 🎭 **User Experience** - Smooth animations and intuitive navigation

## 🛠️ Tech Stack

### Backend
- **🚀 Express.js** - Fast web framework for Node.js
- **🍃 MongoDB** - NoSQL database with Mongoose ODM
- **🔑 JWT** - JSON Web Token authentication
- **🔐 bcryptjs** - Password hashing
- **📁 Multer** - File upload handling
- **☁️ Cloudinary** - Cloud image storage and optimization

### DevOps & Tools
- **🌐 Vercel** - Frontend deployment
- **🚂 Railway/Render** - Backend deployment
- **🔒 Helmet** - Security middleware
- **⚡ Express Rate Limit** - API rate limiting
- **🌍 CORS** - Cross-origin resource sharing

## 📁 Project Structure

```bash
mini-linkedin-platform/
├── backend/                 # Express.js API server
│   ├── config/             # Configuration files
│   │   └── cloudinary.js   # Cloudinary setup
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   ├── posts.js        # Post management
│   │   └── users.js        # User management
│   ├── models/             # MongoDB models
│   │   ├── User.js         # User schema
│   │   └── Post.js         # Post schema
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT verification
│   ├── scripts/            # Database utilities
│   │   └── seed.js         # Database seeding
│   └── package.json        # Backend dependencies
└── └── README.md           # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - [Local](https://www.mongodb.com/try/download/community) or [Cloud](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Free Tier](https://cloudinary.com/users/register/free)
- **Git** - [Download](https://git-scm.com/)

### 1. Clone Repository
```bash
git clone https://github.com/Abhi3110200/linkedin_backend
cd linkedin_backend
```

### 2. Backend Setup
```bash
cd backend  
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/linkedin-community

# JWT Secret (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration (Required)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Start backend server:**
```bash
# Seed database with demo data
npm run seed

# Start development server
npm run dev
```

Backend will run on: **http://localhost:5000**

## 🌐 Deployment

### Backend Deployment (Railway/Render)

#### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### Render
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

## 🔧 Environment Variables

### Backend Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/linkedin-community` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 📊 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
