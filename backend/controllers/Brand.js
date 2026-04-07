const Brand = require("../models/Brand");

exports.getAll = async (req, res) => {
    try {
        const mockBrands = [
            { _id: "b1", name: "Apple" },
            { _id: "b2", name: "Samsung" },
            { _id: "b3", name: "Sony" },
            { _id: "b4", name: "Nike" },
            { _id: "b5", name: "Adidas" },
            { _id: "b6", name: "Dell" },
            { _id: "b7", name: "Google" },
            { _id: "b8", name: "OnePlus" },
            { _id: "b9", name: "Bose" },
            { _id: "b10", name: "Dyson" }
        ];
        res.status(200).json(mockBrands);
    } catch (error) {
        res.status(500).json({message: 'Error fetching brands'});
    }
};

exports.create = async (req, res) => {
    try {
        const created = new Brand(req.body);
        await created.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({message: 'Error adding brand'});
    }
};
