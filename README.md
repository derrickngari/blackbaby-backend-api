# 🛒 BlackBaby Backend API

Welcome to the **BlackBaby Backend API** — a robust, secure, and scalable backend built with **Node.js**, **Express**, and **MongoDB** for managing an e-commerce platform that sells electronic gadgets such as smartphones, wearables, and accessories.

## 🚀 Features

- 🔐 **JWT Authentication & Authorization** (Admin/User)
- 📦 **Product Management** (Create, Read, Update, Delete)
- 🖼 **Image Uploading** with Cloudinary
- ⭐ **Product Reviews & Ratings**
- 📄 **RESTful API** architecture
- 🔎 Filtering, Pagination, and Sorting for product listings
- ✅ Role-based access control (admin-only routes)

## 🧱 Tech Stack

- **Backend Framework**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Image Uploads**: Cloudinary
- **Dev Tools**: Nodemon, dotenv, CORS

---

## 📁 Project Structure

```
blackbaby-backend-api/
│
├── controllers/        # Business logic (products, auth, reviews, uploads)
├── models/             # Mongoose schemas
├── routes/             # API routes
├── middlewares/        # Auth, error handling, uploads
├── config/             # Database and cloudinary config
├── uploads/            # (optional) Local image storage
├── .env                # Environment variables
├── server.js           # Main entry point
└── README.md
```

---

## 🔐 API Authentication

This API uses **JWT** for securing private/admin routes.  
Tokens must be sent in the `Authorization` header as:

```bash
Bearer <token>
```

---

## 🛠 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/derrickngari/blackbaby-backend-api.git
cd blackbaby-backend-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up `.env` file
Create a `.env` file in the root with the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the server
```bash
npm run dev
```

---

## 📦 API Endpoints

### Auth
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user (returns token)

### Products
- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get a product
- `POST /api/products` – Create product (admin only)
- `PUT /api/products/:id` – Update product (admin only)
- `DELETE /api/products/:id` – Delete product (admin only)
- `POST /api/products/upload/:id` – Upload product image

### Reviews
- `POST /api/products/:id/review` – Add review (authenticated users)
- `GET /api/products/:id/review` – Get product reviews

---

## ✨ Coming Soon
- 🛍️ Orders and Payments
- 🧾 Checkout and Cart Logic
- 📊 Admin Dashboard
- 📱 Full Frontend with React + Tailwind

---

## 📷 Screenshots



---

## 👨‍💻 Author

**Derrick Ngari**  
[GitHub Profile](https://github.com/derrickngari)

---

## 📄 License

MIT License

---

> If you like this project, consider giving it a ⭐ on GitHub. Let’s grow this into a full-stack ecommerce SaaS!