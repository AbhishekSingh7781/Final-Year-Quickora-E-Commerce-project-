const express = require('express');
const { signup, login, checkAuth, logout, forgotPassword, resetPassword } = require('../controllers/Auth');
const { verifyToken } = require('../middleware/VerifyToken');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/checkAuth', verifyToken, checkAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;