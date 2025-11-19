const materialService = require('../services/material.service');

const uploadMaterial = async (req, res, next) => {
    try {
        // req.file chứa thông tin file từ Multer
        // req.body chứa title, subjectId, topicId
        // req.user.id lấy từ middleware protect
        const result = await materialService.uploadMaterial(req.user.id, req.file, req.body);

        return res.status(201).json({
            status: "success",
            message: "Upload tài liệu thành công",
            data: result
        });
    } catch (error) {
        // nếu có lỗi và file đã lỡ lên Cloudinary thì nên xóa đi (Optional logic)
        next(error);
        console.log("controller error:", error.message);
        console.log("stack:", error.stack);
        return res.status(error.statusCode || 400).json({
            status: "error",
            message: error.message
        });
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

const getMaterials = async (req, res) => {
    try {
        const result = await materialService.getAllMaterials(req.query);

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
    getMaterials
};