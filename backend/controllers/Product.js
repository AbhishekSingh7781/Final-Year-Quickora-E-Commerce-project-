const Product = require("../models/Product");
const mongoose = require('mongoose');
const { mockProducts } = require('../mockData');

// Create Product
exports.create = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(201).json({ ...req.body, id: Date.now().toString() });
  }
  const product = new Product(req.body);
  product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Fetch All Products with Filtering, Sorting and Pagination
exports.getAll = async (req, res) => {
  // If MongoDB is not connected, use mock products
  if (mongoose.connection.readyState !== 1) {
    let filtered = [...mockProducts];
    
    if (req.query.category) {
        const cats = req.query.category.split(',');
        filtered = filtered.filter(p => cats.includes(p.category));
    }
    if (req.query.brand) {
        const brands = req.query.brand.split(',');
        filtered = filtered.filter(p => brands.includes(p.brand));
    }
    
    const count = filtered.length;
    
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      filtered = filtered.slice((page - 1) * pageSize, page * pageSize);
    }
    
    res.set('X-Total-Count', count);
    return res.status(200).json(filtered);
  }

  let condition = { isDeleted: false };
  if (!req.query.admin) {
    condition.isDeleted = false;
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(',') } });
    totalProductsQuery = totalProductsQuery.find({ category: { $in: req.query.category.split(',') } });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(',') } });
    totalProductsQuery = totalProductsQuery.find({ brand: { $in: req.query.brand.split(',') } });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.countDocuments().exec();

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

// Fetch Product by ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState !== 1) {
    const product = mockProducts.find(p => p.id === id);
    return res.status(200).json(product || mockProducts[0]);
  }
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update Product
exports.updateById = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({ ...req.body, id });
  }
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    const doc = await product.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete Product (Soft Delete)
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({ id, isDeleted: true });
  }
  try {
    const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Undelete Product
exports.undeleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
