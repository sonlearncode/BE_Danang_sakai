const cors = require('cors');
const { ENV } = require('../src/lib/env');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin === ENV.CLIENT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

module.exports = cors(corsOptions);
