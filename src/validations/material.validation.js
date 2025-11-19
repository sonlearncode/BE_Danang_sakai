const Joi = require('joi');

const uploadMaterial = Joi.object({
    body: Joi.object({
        title: Joi.string().required().trim().messages({
            'string.empty': 'Tên tài liệu không được để trống',
            'any.required': 'Tên tài liệu là bắt buộc'
        }),
        subjectId: Joi.string().hex().length(24).required().messages({
            'string.length': 'Subject ID không hợp lệ',
            'any.required': 'Vui lòng chọn môn học'
        }),
        topicId: Joi.string().hex().length(24).required().messages({
            'string.length': 'Topic ID không hợp lệ',
            'any.required': 'Vui lòng chọn chuyên đề'
        })
    })
    // file upload không validate bằng Joi được, mà đã validate bằng Multer
});

const deleteMaterial = Joi.object({
    params: Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            'string.length': 'ID tài liệu không hợp lệ'
        })
    })
});

module.exports = {
    uploadMaterial,
    deleteMaterial
};