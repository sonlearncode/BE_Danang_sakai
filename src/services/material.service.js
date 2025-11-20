const Material = require('../models/material.model');
const Subject = require('../models/subject.model');
const Topic = require('../models/topic.model');
const AppError = require('../utils/app.error');
const { cloudinary } = require('../../config/cloudinary.config');

const uploadMaterial = async (userId, file, data) => {
    // 1. Nhận slug thay vì id
    const { title, subject, topic } = data;

    if (!file) {
        throw new AppError("Vui lòng chọn file để upload", 400);
    }

    // 2. Tìm Môn học bằng Slug (VD: 'toan-hoc')
    const subjectObj = await Subject.findOne({ slug: subject });
    if (!subjectObj) {
        throw new AppError(`Môn học '${subject}' không tồn tại`, 404);
    }

    // 3. Tìm Chuyên đề bằng Slug (VD: 'ham-so') 
    // Kèm điều kiện phải thuộc đúng môn học vừa tìm được
    const topicObj = await Topic.findOne({ slug: topic, subjectId: subjectObj._id });
    if (!topicObj) {
        throw new AppError(`Chuyên đề '${topic}' không tồn tại trong môn ${subjectObj.name}`, 404);
    }

    // 4. Tạo Material (Lưu ID thật vào DB)
    const newMaterial = await Material.create({
        title,
        fileUrl: file.path,
        fileType: file.originalname.split('.').pop(),
        // Lưu ID lấy được từ subjectObj và topicObj
        subjectId: subjectObj._id,
        topicId: topicObj._id,
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
    const filter = {};

    // 1. Xử lý Subject (Hỗ trợ cả ID và Slug)
    if (query.subject) {
        // Nếu truyền slug (VD: ?subject=toan-hoc)
        const sub = await Subject.findOne({ slug: query.subject });
        if (sub) filter.subjectId = sub._id;
    } else if (query.subjectId) {
        // Nếu truyền ID cũ (VD: ?subjectId=691e...)
        filter.subjectId = query.subjectId;
    }

    // 2. Xử lý Topic (Hỗ trợ cả ID và Slug)
    if (query.topic) {
        // Nếu truyền slug (VD: ?topic=ham-so-do-thi)
        const top = await Topic.findOne({ slug: query.topic });
        if (top) filter.topicId = top._id;
    } else if (query.topicId) {
        // Nếu truyền ID cũ
        filter.topicId = query.topicId;
    }

    // Query Material với bộ lọc đã chuẩn bị
    const materials = await Material.find(filter)
        .populate('createdBy', 'fullName email')
        .populate('subjectId', 'name slug') // Lấy thêm slug để frontend dễ dùng
        .populate('topicId', 'name slug')   // Lấy thêm slug
        .sort({ createdAt: -1 });

    return materials;
};

module.exports = {
    uploadMaterial,
    deleteMaterial,
    getAllMaterials
};