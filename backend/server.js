const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// --- Database Connection ---
const { connectToDB } = require('./database/db');
connectToDB();

// --- Import Routes ---
const authRoutes = require('./routes/Auth');
const productRoutes = require('./routes/Product');
const orderRoutes = require('./routes/Order');
const cartRoutes = require('./routes/Cart');
const brandRoutes = require('./routes/Brand');
const categoryRoutes = require('./routes/Category');
const userRoutes = require('./routes/User');
const addressRoutes = require('./routes/Address');
const reviewRoutes = require('./routes/Review');
const wishlistRoutes = require('./routes/Wishlist');

const server = express();

// --- Configuration ---
const PORT = process.env.PORT || 5001; // Render uses process.env.PORT
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// --- Middlewares ---
server.use(cors({
    origin: [frontendUrl, 'http://localhost:5173', 'https://quickora.onrender.com'], // Add your Render URL here
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

server.use(express.json());
server.use(cookieParser());
server.use(morgan(isProduction ? 'combined' : 'dev'));

// --- Static File Serving (Crucial for Render Deployment) ---
// We serve the built frontend from the 'dist' folder
const distPath = path.resolve(__dirname, 'dist');
server.use(express.static(distPath));

// --- Autonomous Mock Middleware (Safety Net) ---
const { mockProducts } = require('./mockData');
let mockCart = [];

server.use((req, res, next) => {
    // If DB is disconnected, use mock fallbacks to keep site functional
    if (mongoose.connection.readyState !== 1) {
        if (req.path === '/products' && req.method === 'GET') {
            let filtered = [...mockProducts];
            res.set('X-Total-Count', filtered.length);
            return res.status(200).json(filtered);
        }
        if (req.path.startsWith('/products/') && req.method === 'GET') {
            const id = req.path.split('/').pop();
            return res.status(200).json(mockProducts.find(p => p.id === id) || mockProducts[0]);
        }
        if (req.path === '/auth/checkAuth') {
            return res.status(200).json({ id: 'mock-user', name: 'Demo User', role: 'user', email: 'demo@example.com' });
        }
        // ... (Add other mock fallbacks as needed)
    }
    next();
});

// --- API Routes ---
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/products', productRoutes);
server.use('/orders', orderRoutes);
server.use('/cart', cartRoutes);
server.use('/brands', brandRoutes);
server.use('/categories', categoryRoutes);
server.use('/address', addressRoutes);
server.use('/reviews', reviewRoutes);
server.use('/wishlist', wishlistRoutes);

// --- Health Check for Render ---
server.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'mock_mode' });
});

// --- SPA Routing (MUST BE LAST) ---
// This ensures that any route not caught by an API will serve the frontend's index.html
server.get('*', (req, res) => {
    const indexFile = path.resolve(distPath, 'index.html');
    if (require('fs').existsSync(indexFile)) {
        res.sendFile(indexFile);
    } else {
        res.status(404).json({ error: 'Frontend build not found. Please run build script.' });
    }
});

// --- Start Server ---
server.listen(PORT, () => {
    console.log(`
    =========================================
    🚀 SERVER DEPLOYED & RUNNING [QUICKORA]
    =========================================
    📡 PORT: ${PORT}
    🛠️  MODE: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}
    🗄️  DB STATUS: ${mongoose.connection.readyState === 1 ? 'CONNECTED' : 'MOCK MODE'}
    📁 STATIC PATH: ${distPath}
    =========================================
    `);
});