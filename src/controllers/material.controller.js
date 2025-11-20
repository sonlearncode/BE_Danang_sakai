const materialService = require('../services/material.service');


const uploadMaterial = async (req, res, next) => {
    try {
        // req.body bây giờ sẽ chứa { title, subject: 'toan-hoc', topic: 'ham-so' }
        const result = await materialService.uploadMaterial(req.user.id, req.file, req.body);

        return res.status(201).json({
            status: "success",
            message: "Upload tài liệu thành công",
            data: result
        });
    } catch (error) {
        // Nếu có lỗi, next() sẽ chuyển sang error handler
        next(error);
    }
};

const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await materialService.deleteMaterial(id, req.user.id);

        return res.status(200).json({
            status: "success",
            message: result.message
        });

    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: "error",
            message: error.message
        });
    }
};

const getMaterialsBySlug = async (req, res) => {
    try {
        // Lấy slug từ đường dẫn URL
        const { subjectSlug, topicSlug } = req.params;

        // Tạo query object giả lập như query string
        const queryInput = {
            subject: subjectSlug,
            topic: topicSlug
        };

        // Gọi lại Service cũ
        const result = await materialService.getAllMaterials(queryInput);

        return res.status(200).json({
            status: "success",
            results: result.length,
            data: result
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    uploadMaterial,
    deleteMaterial,
    getMaterialsBySlug,
};