# 🚗 Vehicle Rental System API

A RESTful backend API for a Vehicle Rental Management System built with Node.js, Express.js, TypeScript, and PostgreSQL. The system supports authentication, role-based authorization, vehicle management, user management, and booking management.

## 🌐 Live URL

**Live API:** https://vehiclerentalsystemapi.vercel.app

**GitHub Repository:** https://github.com/nznazmulhuda/vehicle-rental-system

---

## ✨ Features

- JWT Authentication
- Role-based Authorization (Admin & Customer)
- User Registration & Login
- Vehicle Management (CRUD)
- Booking Management
- Automatic Total Price Calculation
- Vehicle Availability Management
- Booking Status Update (Returned / Cancelled)
- Auto Return Logic for Expired Bookings
- Password Hashing with bcrypt
- PostgreSQL Database
- Modular Project Structure
- Input Validation
- Error Handling
- Database Transactions for Booking Operations

---

## 🛠️ Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)
- dotenv
- tsx

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/nznazmulhuda/vehicle-rental-system
```

### 2. Move to the project directory

```bash
cd vehicle-rental-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT = 5000

SALT_ROUND = 10

JWT_SECRET = your_jwt_secret

JWT_EXPIREIN = 7d

CONNECTION_STRING = your_postgresql_connection_string
```

### 5. Run the development server

```bash
npm run dev
```

### 6. Build the project

```bash
npm run build
```

### 7. Start production server

```bash
npm start
```

---

## 🚀 API Base URL

```
http://localhost:5000/api/v1
```

---

## 📄 License

This project is developed for educational purposes.