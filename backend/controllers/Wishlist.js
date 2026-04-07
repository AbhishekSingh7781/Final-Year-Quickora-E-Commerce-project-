const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
    const { id } = req.user;
    const wishlist = new Wishlist({ ...req.body, user: id });
    try {
        const doc = await wishlist.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchWishlistByUser = async (req, res) => {
    const { id } = req.user;
    try {
        const wishlist = await Wishlist.find({ user: id }).populate('product');
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.removeFromWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Wishlist.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};
