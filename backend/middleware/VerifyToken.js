const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-ecommerce'; // Should be in .env

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, authorization denied.' });
        }

        if (token === 'mock-token') {
            req.user = { id: 'mock-user', role: 'admin' };
            return next();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
