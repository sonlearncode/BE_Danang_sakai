const cors = require('cors');
const { ENV } = require('../src/lib/env');

const allowedOrigins = [
    ENV.CLIENT_URL,                     // FE production
    /\.vercel\.app$/,                   // FE preview / deploy preview
    'http://localhost:5173',            // FE dev
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (origin === ENV.CLIENT_URL) return callback(null, true);

        if (/\.vercel\.app$/.test(origin)) return callback(null, true);

        if (origin.startsWith('http://localhost:5173')) return callback(null, true);

        callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

module.exports = cors(corsOptions);
