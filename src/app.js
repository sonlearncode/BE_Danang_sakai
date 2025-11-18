const express = require('express');
const { connectDB } = require('../config/db.config');
const mainRouter = require('./routes/index');
const cors = require('../config/cors.config');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1', mainRouter);

app.get('/api/v1', (req, res) => {
    res.status(200).json('DaNangScholar xin chào!');
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Server failed to start:`, error);
        process.exit(1);
    }
};

startServer();
