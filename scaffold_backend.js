const fs = require('fs');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');
const dirs = ['controllers', 'models', 'routes', 'database'];

dirs.forEach(d => {
  const dirPath = path.join(backendPath, d);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// Create basic db connection
fs.writeFileSync(path.join(backendPath, 'database', 'db.js'), `
const mongoose = require('mongoose');
exports.connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/quickora');
        console.log('Connected to DB');
    } catch(err) {
        console.log('DB conn failed (this is expected if mongo is not running locally)', err);
    }
}
`);

// Mock routes
const routes = ['Auth', 'Product', 'Order', 'Cart', 'Brand', 'Category', 'User', 'Address', 'Review', 'Wishlist'];
routes.forEach(r => {
    fs.writeFileSync(path.join(backendPath, 'routes', `${r}.js`), `
        const express = require('express');
        const router = express.Router();
        router.get('/', (req, res) => res.json({message: '${r} route mock'}));
        router.post('/', (req, res) => res.json({message: '${r} POST route mock'}));
        module.exports = router;
    `);
    
    // Create models
    fs.writeFileSync(path.join(backendPath, 'models', `${r}.js`), `
        const mongoose = require('mongoose');
        const schema = new mongoose.Schema({ name: String }, { strict: false });
        module.exports = mongoose.model('${r}', schema);
    `);
});

// Copy existing root files to controllers or where they belong
const rootFiles = ['Address.js', 'Cart.js', 'Order.js', 'Product.js', 'Review.js', 'User.js', 'Wishlist.js'];
rootFiles.forEach(f => {
    if (fs.existsSync(path.join(__dirname, f))) {
        fs.renameSync(path.join(__dirname, f), path.join(backendPath, 'controllers', f));
    }
});

if (fs.existsSync(path.join(__dirname, 'Index.js'))) {
    fs.renameSync(path.join(__dirname, 'Index.js'), path.join(backendPath, 'index.js'));
}

console.log('Backend scaffolding complete');
