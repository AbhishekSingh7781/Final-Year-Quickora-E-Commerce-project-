const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-ecommerce'; // Should be in .env

const mongoose = require('mongoose');

exports.signup = async (req, res) => {
    // Stricter check: 1 is connected. Anything else is handled by mock.
    if (mongoose.connection.readyState !== 1) {
        const role = req.body.email && req.body.email.includes('admin') ? 'admin' : 'user';
        res.cookie('jwt', 'mock-token', {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
            httpOnly: true,
        });
        res.cookie('mock_role', role, { expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });
        return res.status(201).json({ id: 'mock-user', name: req.body.name || 'Demo User', email: req.body.email, role: role });
    }
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        await user.save();

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '15d' }
        );

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(201).json({ id: user.id, role: user.role, email: user.email, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const role = req.body.email && req.body.email.includes('admin') ? 'admin' : 'user';
        res.cookie('jwt', 'mock-token', {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
            httpOnly: true,
        });
        res.cookie('mock_role', role, { expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });
        return res.status(200).json({ id: 'mock-user', name: 'Demo User', email: req.body.email, role: role });
    }
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '15d' }
        );

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({ id: user.id, role: user.role, email: user.email, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.checkAuth = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const role = req.cookies.mock_role || 'user';
        if (req.cookies.jwt === 'mock-token') {
            return res.status(200).json({ id: 'mock-user', name: 'Demo User', role: role, email: 'demo@example.com' });
        }
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        // If the request contains a valid token cookie, we decode it
        // The middleware will add req.user if valid
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                return res.status(200).json({ id: user.id, role: user.role, email: user.email, name: user.name });
            }
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            expires: new Date(0),
            httpOnly: true,
        });
        res.cookie('mock_role', '', {
            expires: new Date(0),
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(200).json({ message: 'Reset email sent (simulated)' });
    }
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // In a real app, send an email with a reset link
        // For this demo, we'll just simulate success
        res.status(200).json({ message: 'Reset email sent (simulated)' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(200).json({ message: 'Password reset successful' });
    }
    try {
        const { id, token, password } = req.body; // In real app, id/token in query/params
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired reset link' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
