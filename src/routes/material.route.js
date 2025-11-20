const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');
const materialValidation = require('../validations/material.validation');
const { uploadCloud } = require('../../config/cloudinary.config');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth.middleware');

const uploadMiddleware = uploadCloud.single('file');

// POST /api/v1/materl/upload
router.post(
    '/upload',
    protect,
    // 1. Middleware Wrapper (Bắt lỗi upload tận tay)
    (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err) {
                console.error("[UPLOAD ERROR LOG]:");

                if (err instanceof multer.MulterError) {
                    console.error("Multer Error:", err.message);
                    return res.status(400).json({
                        status: "error",
                        message: `Lỗi upload file: ${err.message}`
                    });
                } else if (err) {
                    const errorDetails = JSON.stringify(err, null, 2);
                    console.error("Cloudinary/Unknown Error:", errorDetails);

                    return res.status(500).json({
                        status: "error",
                        message: "Lỗi xảy ra khi upload file lên Cloudinary",
                        debug_error: err.message || err
                    });
                }
            }
            next();
        });
    },
    // 2. Validate (Đã sửa trong validation.js để chấp nhận slug)
    validate(materialValidation.uploadMaterial),
    // 3. Controller (Đã sửa trong service.js để tìm ID từ slug)
    materialController.uploadMaterial
);

// DELETE /api/v1/materials/:id
router.delete(
    '/:id',
    protect,
    validate(materialValidation.deleteMaterial),
    materialController.deleteMaterial
);

// Đặt biến là :subjectSlug và :topicSlug
router.get(
    '/:subjectSlug/:topicSlug',
    validate(materialValidation.getMaterial),
    materialController.getMaterialsBySlug
);

module.exports = router;