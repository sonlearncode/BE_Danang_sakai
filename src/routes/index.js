const express = require('express');
const authRoutes = require('./auth.route');
const materialRoutes = require('./material.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/material', materialRoutes);

module.exports = router;