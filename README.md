# Edemy LMS - Learning Management System

A full-stack Learning Management System built with React and Node.js that enables educators to create and sell courses, and students to enroll and learn.

![Edemy LMS](https://img.shields.io/badge/Edemy-LMS-blue)
![React](https://img.shields.io/badge/React-18.0.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)

## ✨ Features

### For Students
- 🔐 User authentication (Register/Login)
- 📚 Browse and search courses
- 🛒 Purchase courses via Stripe
- 🎥 Video course player with progress tracking
- 📊 Track enrolled courses and learning progress
- ⭐ Course ratings and reviews

### For Educators
- 📝 Create and manage courses
- 📹 Upload course content with chapters and lectures
- 💰 Track earnings and enrollments
- 👥 View enrolled students
- 📈 Dashboard with analytics

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool |
| React Router v7 | Routing |
| Tailwind CSS | Styling |
| Axios | HTTP Client |
| Framer Motion | Animations |
| Quill | Rich Text Editor |
| React Toastify | Notifications |
| React YouTube | Video Player |

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt.js | Password Hashing |
| Cloudinary | Media Storage |
| Stripe | Payment Processing |
| Multer | File Uploads |

## 📁 Project Structure

```
Learner_Management/
├── client/                    # React Frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, data
│   │   ├── components/      # Reusable components
│   │   │   ├── educator/    # Educator-specific components
│   │   │   └── student/     # Student-specific components
│   │   ├── context/         # React Context (Auth, App state)
│   │   ├── pages/           # Page components
│   │   │   ├── educator/    # Educator pages
│   │   │   └── student/     # Student pages
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Node.js Backend
│   ├── api/                  # Vercel serverless functions
│   ├── configs/              # Configuration files
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   ├── mongodb.js       # Database connection
│   │   └── multer.js        # File upload config
│   ├── controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── educatorController.js
│   │   ├── userController.js
│   │   └── webhooks.js
│   ├── middlewares/          # Custom middlewares
│   │   └── authMiddleware.js
│   ├── models/               # Mongoose models
│   │   ├── Course.js
│   │   ├── CourseProgress.js
│   │   ├── Purchase.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoute.js
│   │   ├── educatorRoutes.js
│   │   └── userRoutes.js
│   ├── server.js             # Express server
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Cloudinary** account
- **Stripe** account

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/SatyamKumarCS/Learner_Management.git
cd Learner_Management
```

### 2. Install dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

## ⚙️ Environment Variables

### Server (`server/.env`)

Create a `.env` file in the `server` directory:

```env
# Frontend URL
FRONTEND="http://localhost:5173/"

# MongoDB
MONGODB_URI="your-mongodb-connection-string"

# Cloudinary
CLOUDINARY_URL="your-cloudinary-url"
CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_SECRET_KEY="your-cloudinary-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# JWT
JWT_SECRET="your-super-secret-jwt-key-make-it-long-and-random"
```

### Client (`client/.env`)

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL="http://localhost:5000"
```

## 🏃 Running the Application

### Development Mode

**Start the server:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Start the client:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

### Production Build

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/course/all` | Get all courses |
| GET | `/api/course/:id` | Get course by ID |

### User (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/data` | Get user data |
| GET | `/api/user/enrolled-courses` | Get enrolled courses |
| POST | `/api/user/purchase` | Purchase a course |
| POST | `/api/user/update-course-progress` | Update progress |
| GET | `/api/user/get-course-progress` | Get course progress |

### Educator (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/educator/add-course` | Add new course |
| GET | `/api/educator/courses` | Get educator's courses |
| GET | `/api/educator/dashboard` | Get dashboard data |
| GET | `/api/educator/enrolled-students` | Get enrolled students |
| POST | `/api/educator/update-role` | Update to educator role |

## 🌐 Deployment

### Vercel Deployment

Both client and server are configured for Vercel deployment.

**Client:**
- Deploy the `client` folder
- Set environment variables in Vercel dashboard

**Server:**
- Deploy the `server` folder
- Set environment variables in Vercel dashboard
- Configure `vercel.json` for serverless functions

### Environment Variables for Production

Make sure to update:
- `FRONTEND` to your production client URL
- `VITE_BACKEND_URL` to your production server URL

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Satyam Kumar**

- GitHub: [@SatyamKumarCS](https://github.com/SatyamKumarCS)

---

⭐ Star this repository if you found it helpful!
