const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controllers/Cart');
const { verifyToken } = require('../middleware/VerifyToken');

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, fetchCartByUser);
router.delete('/:id', verifyToken, deleteFromCart);
router.patch('/:id', verifyToken, updateCart);

module.exports = router;