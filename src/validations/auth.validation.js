const Joi = require('joi');
const validator = require('validator');

const isValidEmail = Joi.string()
    .required()
    .custom((value, helpers) => {
        if (!validator.isEmail(value)) {
            return helpers.message('Email sai định dáng');
        }
        return value;
    });

const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const register = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        password: Joi.string()
            .pattern(passwordValidator)
            .required()
            .messages({
                "string.pattern.base":
                    "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                "string.empty": "Mật khẩu không được để trống",
                "any.required": "Mật khẩu là bắt buộc"
            }),
        fullName: Joi.string().min(5).max(50).required(),
    }),
});

const login = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        password: Joi.string().required().messages({
            'string.empty': 'Mật khẩu không được để trống.',
        }),
    }),
})

const verify = Joi.object({
    body: Joi.object({
        email: isValidEmail,
        otp: Joi.string()
            .length(6)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
                'string.pattern.base': 'OTP phải gồm 6 chữ số.',
            }),
    }),
});

const resend = Joi.object({
    body: Joi.object({
        email: isValidEmail,
    }),
});

module.exports = {
    register,
    login,
    verify,
    resend
};