const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
    const { id } = req.user;
    const order = new Order({ ...req.body, user: id });
    try {
        const doc = await order.save();
        // Clear user's cart after successful order
        await Cart.deleteMany({ user: id });
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchOrdersByUser = async (req, res) => {
    const { id } = req.user;
    try {
        const orders = await Order.find({ user: id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAllOrders = async (req, res) => {
    // For admin
    let query = Order.find({ isDeleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ isDeleted: { $ne: true } });

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit);
        const page = parseInt(req.query._page);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await require('../models/Product').countDocuments();
        const totalUsers = await require('../models/User').User.countDocuments();
        
        const revenue = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalRevenue: revenue[0] ? revenue[0].totalRevenue : 0
        });
    } catch (err) {
        res.status(400).json({ message: 'Error fetching stats', error: err });
    }
};
