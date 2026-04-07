const express = require('express');
const { createOrder, fetchOrdersByUser, updateOrder, fetchAllOrders, getStats } = require('../controllers/Order');
const { verifyToken } = require('../middleware/VerifyToken');

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/user', verifyToken, fetchOrdersByUser);
router.get('/stats', verifyToken, getStats);
router.patch('/:id', verifyToken, updateOrder); // update status
router.get('/', verifyToken, fetchAllOrders); // For admin

module.exports = router;