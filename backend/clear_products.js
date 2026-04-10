require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const clearDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const result = await Product.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} products from the database.`);
        
        process.exit(0);
    } catch (err) {
        console.error('Error clearing database:', err);
        process.exit(1);
    }
};

clearDatabase();
