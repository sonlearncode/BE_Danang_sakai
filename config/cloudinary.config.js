const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { ENV } = require('../src/lib/env');
const AppError = require('../src/utils/app.error');

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'danangscholar_materials',
        resource_type: 'raw', // raw để hỗ trợ tốt nhất cho pdf, docx, ppt
        public_id: (req, file) => {
            // đặt tên file: xóa đuôi + timestamp  tránh trùng
            const name = file.originalname.split('.')[0];
            return `${name}-${Date.now()}`;
        },
        // lưu ý: allowed_formats ở đây chỉ hoạt động tốt với image/video.
        // với raw file, ta nên filter thủ công ở fileFilter bên dưới
    }
});

const fileFilter = (req, file, cb) => {
    // Danh sách đuôi file cho phép
    const allowedMimeTypes = [
        'application/pdf', // .pdf
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.ms-powerpoint', // .ppt
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Định dạng file không hỗ trợ! Chỉ chấp nhận PDF, DOCX, PPTX.', 400), false);
    }
};

const uploadCloud = multer({
    storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Giới hạn 10MB 
});

module.exports = { uploadCloud, cloudinary };