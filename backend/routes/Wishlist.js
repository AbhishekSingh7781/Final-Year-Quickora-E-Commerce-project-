const express = require('express');
const { addToWishlist, fetchWishlistByUser, removeFromWishlist } = require('../controllers/Wishlist');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, addToWishlist)
      .get('/', verifyToken, fetchWishlistByUser)
      .delete('/:id', verifyToken, removeFromWishlist);

module.exports = router;