const mongoose = require('mongoose');
const { VALID_SUBJECT_NAMES, GROUP_NATURAL, GROUP_SOCIAL } = require('../../config/constants');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: VALID_SUBJECT_NAMES // Chỉ chấp nhận tên môn đúng quy định
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // Phân loại khối (Tự nhiên / Xã hội)
    group: {
        type: String,
        required: true,
        enum: [GROUP_NATURAL, GROUP_SOCIAL],
        index: true // Đánh index để lọc theo khối nhanh hơn
    },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);