const mongoose = require('mongoose');
const { ENV } = require('../src/lib/env');

const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error('MONGO_URI is not defined');

        const cnn = await mongoose.connect(MONGO_URI);
        console.log('MONGODB CONNECTED:', cnn.connection.host);
    } catch (error) {
        console.log('Error connection to MONGODB:', error);
        process.exit(1); // thoát app, lỗi connect db
    }
}

module.exports = {
    connectDB
};