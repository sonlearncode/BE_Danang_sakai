const mongoose = require('mongoose');
const { ENV } = require('../src/lib/env');

const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error('MONGO_URI is not defined');

        const cnn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MONGODB CONNECTED:', cnn.connection.host);
    } catch (error) {
        console.error('Error connection to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
