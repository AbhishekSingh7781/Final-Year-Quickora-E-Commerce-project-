const Category = require("../models/Category");

exports.getAll = async (req, res) => {
    const mockCategories = [
        { _id: 'c0', name: 'All' },
        { _id: 'c1', name: 'Mobiles' },
        { _id: 'c2', name: 'Laptops' },
        { _id: 'c3', name: 'Audio' },
        { _id: 'c4', name: 'Fashion' },
        { _id: 'c5', name: 'Cameras' },
        { _id: 'c6', name: 'Appliances' },
        { _id: 'c7', name: 'Home' },
        { _id: 'c8', name: 'Toys' },
        { _id: 'c9', name: 'Beauty' },
        { _id: 'c10', name: 'Sports' }
    ];
    res.status(200).json(mockCategories);
};

exports.create = async (req, res) => { res.status(201).json(req.body); };
