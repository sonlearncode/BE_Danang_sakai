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
    // middleware Wrapper để bắt lỗi upload
    (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err) {
                // Nếu có lỗi từ Cloudinary/Multer
                console.error("[UPLOAD ERROR LOG]:");

                if (err instanceof multer.MulterError) {
                    // Lỗi của Multer (ví dụ file quá lớn)
                    console.error("Multer Error:", err.message);
                    return res.status(400).json({
                        status: "error",
                        message: `Lỗi upload file: ${err.message}`
                    });
                } else if (err) {
                    // Lỗi từ Cloudinary hoặc lỗi không xác định
                    // Cố gắng parse object lỗi ra JSON để đọc
                    const errorDetails = JSON.stringify(err, null, 2);
                    console.error("Cloudinary/Unknown Error:", errorDetails);

                    return res.status(500).json({
                        status: "error",
                        message: "Lỗi xảy ra khi upload file lên Cloudinary",
                        debug_error: err.message || err // Trả về client để debug
                    });
                }
            }
            next();
        });
    },
    validate(materialValidation.uploadMaterial),
    materialController.uploadMaterial
);

// DELETE /api/v1/materials/:id
router.delete(
    '/:id',
    protect,
    validate(materialValidation.deleteMaterial),
    materialController.deleteMaterial
);

// GET /api/v1/materials?subjectId=...&topicId=...
router.get(
    '/',
    materialController.getMaterials
);

module.exports = router;