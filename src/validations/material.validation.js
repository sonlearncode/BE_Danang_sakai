const Joi = require('joi');
const uploadMaterial = Joi.object({
    body: Joi.object({
        title: Joi.string().required().trim().messages({
            'string.empty': 'Tên tài liệu không được để trống',
            'any.required': 'Tên tài liệu là bắt buộc'
        }),
        // Thay đổi từ ID sang Slug
        subject: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập slug môn học (VD: toan-hoc)',
            'any.required': 'Slug môn học là bắt buộc'
        }),
        topic: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập slug chuyên đề (VD: ham-so)',
            'any.required': 'Slug chuyên đề là bắt buộc'
        })
    })
    // file upload validation xử lý bởi Multer
});

const deleteMaterial = Joi.object({
    params: Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            'string.length': 'ID tài liệu không hợp lệ'
        })
    })
});

const getMaterial = Joi.object({
    body: Joi.object({
        subject: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập slug môn học (VD: toan-hoc)',
            'any.required': 'Slug môn học là bắt buộc'
        }),
        topic: Joi.string().required().messages({
            'string.empty': 'Vui lòng nhập slug chuyên đề (VD: ham-so)',
            'any.required': 'Slug chuyên đề là bắt buộc'
        })
    })
});

module.exports = {
    uploadMaterial,
    deleteMaterial,
    getMaterial,
};