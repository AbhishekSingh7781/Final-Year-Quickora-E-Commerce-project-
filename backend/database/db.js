
const mongoose = require('mongoose');
exports.connectToDB = async () => {
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false); 
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/quickora', {
            serverSelectionTimeoutMS: 2000 // Fast fail
        });
        console.log('✔ Connected to DB');
    } catch(err) {
        console.log('✘ DB Connection Failed (Mock Mode ACTIVE)', err.message);
    }
}
