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
        
        // Mock Product Catalog
        if (req.path === '/products' && req.method === 'GET') {
            let filtered = [...mockProducts];
            if (req.query.category) filtered = filtered.filter(p => req.query.category.split(',').includes(p.category));
            res.set('X-Total-Count', filtered.length);
            if (req.query._page && req.query._limit) {
                const pageSize = parseInt(req.query._limit);
                const page = parseInt(req.query._page);
                filtered = filtered.slice((page - 1) * pageSize, page * pageSize);
            }
            return res.status(200).json(filtered);
        }

        // Mock Product Detail
        if (req.path.startsWith('/products/') && req.method === 'GET') {
            const id = req.path.split('/').pop();
            return res.status(200).json(mockProducts.find(p => p.id === id) || mockProducts[0]);
        }

        // Mock Authentication
        if (req.path === '/auth/login' || req.path === '/auth/signup') {
            const role = req.body.email && req.body.email.includes('admin') ? 'admin' : 'user';
            res.cookie('jwt', 'mock-token', { expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), httpOnly: true });
            res.cookie('mock_role', role, { expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });
            return res.status(200).json({ id: 'mock-user', name: 'Demo User', role: role, email: req.body.email || 'demo@example.com' });
        }

        if (req.path === '/auth/checkAuth') {
            const role = req.cookies.mock_role || 'user';
            return res.status(200).json({ id: 'mock-user', name: 'Demo User', role: role, email: 'demo@example.com' });
        }

        // Mock Cart Operations
        if (req.path === '/cart') {
            if (req.method === 'POST') {
                const product = mockProducts.find(p => p.id === req.body.product) || mockProducts.find(p => p.id === req.body.product?.id) || mockProducts[0];
                const cartItem = { id: 'cart-' + Math.random().toString(36).substr(2, 9), product, quantity: req.body.quantity || 1 };
                mockCart.push(cartItem);
                return res.status(201).json(cartItem);
            }
            if (req.method === 'GET') {
                return res.status(200).json(mockCart);
            }
        }

        if (req.path.startsWith('/cart/') && (req.method === 'PATCH' || req.method === 'DELETE')) {
            const id = req.path.split('/').pop();
            if (req.method === 'DELETE') {
                mockCart = mockCart.filter(item => item.id !== id);
                return res.status(200).json({ id });
            }
            const index = mockCart.findIndex(item => item.id === id);
            if (index !== -1) {
                mockCart[index] = { ...mockCart[index], ...req.body };
                return res.status(200).json(mockCart[index]);
            }
        }

        // Mock Order Operations
        if (req.path === '/orders' || req.path === '/orders/user/own') {
            if (req.method === 'POST') return res.status(201).json({ id: 'order-' + Math.random().toString(36).substr(2, 9), status: 'pending', ...req.body });
            
            const sampleOrder = {
                id: 'ord-mock-12345',
                items: [
                    { id: 'item-1', product: mockProducts[0], quantity: 2 },
                    { id: 'item-2', product: mockProducts[1], quantity: 1 }
                ],
                totalAmount: (mockProducts[0].price * 2) + mockProducts[1].price,
                status: 'shipped',
                paymentMethod: 'card',
                selectedAddress: {
                    name: 'Demo User',
                    street: '123 Tech Lane',
                    locality: 'Silicon Valley',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001',
                    phone: '9876543210'
                },
                createdAt: new Date().toISOString()
            };
            return res.status(200).json([sampleOrder]);
        }

        if (req.path === '/orders/stats') {
            return res.status(200).json({
                totalOrders: 145,
                totalProducts: mockProducts.length,
                totalUsers: 1205,
                totalRevenue: 542000
            });
        }

        // Mock Metadata
        if (req.path === '/brands') return res.status(200).json([
            {id: 'b1', name: 'Apple'}, {id: 'b2', name: 'Samsung'}, {id: 'b3', name: 'Sony'}, {id: 'b4', name: 'Nike'}
        ]);
        if (req.path === '/categories') return res.status(200).json([
            {id: 'c1', name: 'Mobiles'}, {id: 'c2', name: 'Laptops'}, {id: 'c3', name: 'Audio'}, {id: 'c4', name: 'Fashion'}
        ]);
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
server.get(/.*/, (req, res) => {
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