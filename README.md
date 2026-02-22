# LuxeCart - Premium Full Stack E-Commerce Website

LuxeCart is a modern, responsive, fully functional E-commerce application built from scratch using the robust MERN stack (without React, using Vanilla JS for frontend). It allows users to browse products, add items to the cart, register, login, securely checkout using Razorpay (Test mode), and includes an Admin Dashboard for complete product management.

## 🚀 Live Demo
- **Frontend Live URL**: [Your Vercel Link Here]
- **Backend API URL**: [Your Render Link Here]

## ✨ Features
### User Features:
- Fully responsive, modern, and minimal UI (Glassmorphism inspired touches)
- User Authentication (JWT-based secure login and registration)
- Product browsing with detailed views
- Functional Add to Cart & dynamic quantity updating
- Complete checkout process with Tax & Shipping calculations
- Seamless Payment Integration via **Razorpay (Test Mode)**
- Smooth toast notifications and loading spinners
- Empty state handling for cart & 404 Pages

### Admin Features (Protected Routes):
- Admin Dashboard to view all products
- Add, Edit, Delete CRUD functionality for products
- Stock management
- Secure backend API blocking unauthorized access

## 🛠️ Tech Stack
**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Modern CSS variables, flexbox, grid
- FontAwesome Icons & Google Fonts

**Backend:**
- Node.js & Express.js
- MongoDB Atlas & Mongoose (ODM)
- JSON Web Token (JWT) for secure authenticated sessions
- Bcrypt.js for password hashing

**Payment Gateway:**
- Razorpay Integration

**Deployment Platforms:**
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Cloud Database)

---

## 📸 Screenshots
*(Add screenshots of your application here to make your portfolio stand out)*
- `Home-Page.png`
- `Product-Details.png`
- `Cart-Checkout.png`
- `Admin-Dashboard.png`

---

## 💻 Local Installation Guide

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account

### 1. Clone the repository
```sh
git clone <your-repository-url>
cd e-commerce
```

### 2. Setup Backend
```sh
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add the following:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```
Start the backend server:
```sh
npm run dev
```

### 3. Setup Frontend
1. Open `frontend/js/api.js`
2. Ensure `API_URL` points to your active backend (e.g., `http://localhost:5000/api`)
3. Open `frontend/index.html` in your browser. (Optionally use Live Server extension in VS Code)

---

## 🚀 Deployment Instructions

### A. Database (MongoDB Atlas)
1. Sign in to MongoDB Atlas and create a free tier cluster.
2. In 'Database Access', create a user with read/write permissions.
3. In 'Network Access', allow access from anywhere (`0.0.0.0/0`).
4. Click 'Connect', choose 'Connect your application', and copy the connection string. Replace `<password>` with your database user password.

### B. Backend Deployment (Render)
1. Push your code to GitHub.
2. Create an account on [Render](https://render.com/).
3. Click "New" > "Web Service" and connect your GitHub repository.
4. Set the Root Directory to `backend` (if you deploy the whole repo) or build command to `npm install` and start command to `node server.js`
5. **Environment Variables:** Add all variables from your `.env` (MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, etc.).
6. Click **Deploy**. Once live, copy the Render URL.

### C. Frontend Deployment (Vercel)
1. Before deploying, open `/frontend/js/api.js`.
2. Update the `API_URL` from `http://localhost:5000/api` to your **Render live URL** (e.g., `https://your-backend.onrender.com/api`).
3. Commit and push these changes to GitHub.
4. Go to [Vercel](https://vercel.com/) and create a new project.
5. Import your GitHub repository.
6. Set the **Root Directory** to `frontend`.
7. Click **Deploy**.

**Congratulations! Your full-stack E-commerce app is live! 🎉**
