# Inventory Management System – Backend

## Overview

This backend is built using **Node.js, Express.js, and MongoDB**.
It provides APIs for managing users, inventory, and orders with secure authentication using **JWT**.

The system supports **two roles**:

- **Admin** → Manage products, view orders, manage users
- **User** → View products and place orders

---

# Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Helmet (security headers)
- Morgan (logging)
- express-validator (input validation)

---

# Project Structure

```
backend
│
├── config
│   └── db.js
│
├── constants
│   ├── env.js
│   ├── roles.js
│   └── messages.js
│
├── controllers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── userController.js
│   └── dashboardController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── userRoutes.js
│   └── dashboardRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

# Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory-system
JWT_SECRET=inventory_secret
```

---

# Install Dependencies

```
npm install
```

---

# Run the Server

```
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# Authentication Flow

```
Login / Register
       ↓
JWT token generated
       ↓
Token sent in request header
       ↓
authMiddleware verifies token
       ↓
User allowed to access protected APIs
```

Header example:

```
Authorization: Bearer TOKEN
```

---

# API Endpoints

## Auth

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Products

### Create Product (Admin)

```
POST /api/products
```

### Get Products

```
GET /api/products
```

### Get Product

```
GET /api/products/:id
```

### Update Product

```
PUT /api/products/:id
```

### Delete Product

```
DELETE /api/products/:id
```

---

## Orders

### Place Order

```
POST /api/orders
```

### User Orders

```
GET /api/orders/my-orders
```

### Order Details

```
GET /api/orders/:id
```

### Admin Orders

```
GET /api/orders
```

---

## Users

### Current User

```
GET /api/users/me
```

### User Listing (Admin)

```
GET /api/users
```

---

## Dashboard

### Admin Stats

```
GET /api/dashboard/stats
```

Returns:

- Total Users
- Total Products
- Total Orders
- Total Stock
- Recent Orders
- Low Stock Products

---

# Inventory Flow

```
Admin adds product
      ↓
User places order
      ↓
Stock automatically decreases
      ↓
Low stock alert triggered if threshold reached
```

---

# Security Features

- JWT Authentication
- Password hashing with bcrypt
- Role based authorization
- Helmet security headers
- Input validation
- Environment variable configuration

---

# API Testing

Use **Postman**.

Base URL:

```
http://localhost:5000/api
```

---

# Future Improvements

- Order status tracking
- Email notifications
- Inventory purchase orders
- Pagination for listing APIs
