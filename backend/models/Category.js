
        const mongoose = require('mongoose');
        const schema = new mongoose.Schema({ name: String }, { strict: false });
        module.exports = mongoose.model('Category', schema);
    