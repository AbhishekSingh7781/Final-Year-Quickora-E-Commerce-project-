# Quickora - Premium E-commerce Platform 🚀

Quickora is a modern, full-stack e-commerce application designed with a focus on high-fidelity UI/UX, robust security, and scalable architecture.

## ✨ Features

### 🛒 **Customer Experience**
- **Dynamic Catalog**: Browse products with advanced filtering and search.
- **Wishlist**: Save your favorite items for later with persistent storage.
- **Unified Cart**: Smooth cart management with real-time price calculations and "Move to Wishlist" logic.
- **Cinematic Checkout**: A multi-step, secure checkout wizard (Address → Summary → Payment).
- **Order Tracking**: Beautiful dashboard to track order status from "Pending" to "Delivered".

### 🛡️ **Authentication & Security**
- **JWT-based Auth**: Secure session management using `httpOnly` cookies.
- **Role-Based Access**: Strict separation between `Admin` and `User` privileges.
- **Password Recovery**: Integrated "Forgot Password" flow with OTP/Link simulation.

### 📊 **Administrative Suite**
- **Stats Dashboard**: Real-time business analytics (Total Revenue, Orders, Users, Products).
- **Inventory Management**: Add, update, and manage products with a professional interface.
- **Order Control**: Complete overview of all customer orders with status update capabilities.

## 🛠️ Technology Stack
- **Frontend**: React, Material UI (MUI), Redux Toolkit, Framer Motion.
- **Backend**: Node.js, Express.
- **Database**: MongoDB with Mongoose ODM.
- **Authentication**: JSON Web Token (JWT), BcryptJS.

## 🚀 Deployment & Installation

### **Prerequisites**
- Node.js (v18+)
- MongoDB (Running locally on 27017 or a Cloud URI)

### **Setup**
1. **Database**: Start your MongoDB instance.
2. **Backend**:
   - `cd backend`
   - `npm install`
   - `node Seed.js` (Optional: To populate with premium data)
   - `node index.js`
3. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

### **Production Mode**
Quickora is ready for a single-server deployment.
1. Run `npm run build` in the `frontend` folder.
2. The `backend` is configured to serve the `dist` folder automatically in production.
3. Live preview at `http://localhost:5001`.

---
*Created with ❤️ by Antigravity*
