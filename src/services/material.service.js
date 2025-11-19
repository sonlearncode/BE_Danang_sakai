const Material = require('../models/material.model');
const Subject = require('../models/subject.model');
const Topic = require('../models/topic.model');
const AppError = require('../utils/app.error');
const { cloudinary } = require('../../config/cloudinary.config');

const uploadMaterial = async (userId, file, data) => {
    const { title, subjectId, topicId } = data;

    // kiểm tra file
    if (!file) {
        throw new AppError("Vui lòng chọn file để upload", 400);
    }

    // kiểm tra Subject và Topic có tồn tại không
    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) throw new AppError("Môn học không tồn tại", 404);

    const topicExists = await Topic.findById(topicId);
    if (!topicExists) throw new AppError("Chuyên đề không tồn tại", 404);

    // tạo Material
    const newMaterial = await Material.create({
        title,
        fileUrl: file.path, // Cloudinary trả về link trong file.path
        fileType: file.originalname.split('.').pop(), // Lấy đuôi file 
        subjectId,
        topicId,
        createdBy: userId
    });

    return newMaterial;
};

const deleteMaterial = async (materialId, userId) => {
    // tìm tài liệu
    const material = await Material.findById(materialId);
    if (!material) {
        throw new AppError("Tài liệu không tìm thấy", 404);
    }

    // kiểm tra quyền: Chỉ người tạo mới được xóa
    if (material.createdBy.toString() !== userId) {
        throw new AppError("Bạn không có quyền xóa tài liệu này", 403);
    }

    // xóa file trên Cloudinary
    // logic: Lấy public_id từ URL để xóa. 
    // ví dụ URL: .../danangscholar_materials/tailieu-123.pdf
    // public ID: danangscholar_materials/tailieu-123
    try {
        const fileUrl = material.fileUrl;
        // tách lấy public_id (cách này xử lý đơn giản, tùy vào cấu trúc URL)
        const splitUrl = fileUrl.split('/');
        const fileName = splitUrl[splitUrl.length - 1]; // tailieu-123.pdf
        const publicId = `danangscholar_materials/${fileName.split('.')[0]}`; // danangscholar_materials/tailieu-123

        // gọi Cloudinary xóa (resource_type: raw cho pdf/doc)
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    } catch (err) {
        console.error("Lỗi xóa file trên Cloudinary:", err);
        // vẫn tiếp tục xóa trong DB dù lỗi Cloudinary để tránh rác DB
    }

    // xóa trong Database
    await Material.findByIdAndDelete(materialId);

    return { message: "Xóa tài liệu thành công" };
};

const getAllMaterials = async (query) => {
    // filter theo subject hoặc topic nếu cần
    const filter = {};
    if (query.subjectId) filter.subjectId = query.subjectId;
    if (query.topicId) filter.topicId = query.topicId;

    const materials = await Material.find(filter)
        .populate('createdBy', 'fullName email') // lấy thông tin người đăng
        .populate('subjectId', 'name')           // lấy tên môn
        .populate('topicId', 'name')             // lấy tên chuyên đề
        .sort({ createdAt: -1 });                // mới nhất lên đầu

    return materials;
};

module.exports = {
    uploadMaterial,
    deleteMaterial,
    getAllMaterials
};