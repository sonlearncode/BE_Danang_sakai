const express = require('express');
const { validate } = require('../middleware/validate');
const authValidator = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
    '/register',
    validate(authValidator.register),
    authController.register
);

router.post(
    '/verify-otp',
    validate(authValidator.verify),
    authController.verifyOTP
);

router.post(
    '/resend-otp',
    validate(authValidator.resend),
    authController.resendOTP
);

router.post(
    '/login',
    validate(authValidator.login),
    authController.login
);

router.get(
    '/me',
    protect,
    authController.getMe
)

router.get(
    '/logout',
    authController.logout
)

module.exports = router