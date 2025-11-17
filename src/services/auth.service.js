const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/email.service');
const { ENV } = require('../lib/env');
const AppError = require('../utils/app.error');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (email, password, fullName) => {
    const exists = await User.findOne({ email });
    if (exists) throw new AppError("Email đã tồn tại", 400);

    const otp = generateOTP();
    const otpExpire = Date.now() + 3 * 60 * 1000;

    const user = new User({
        email,
        password,
        fullName,
        otp,
        otpExpire,
    });

    await user.save();
    await sendOTP(email, otp);

    return { message: "OTP đã gửi đến email của bạn, vui lòng kiểm tra hộp thư" };
};

const verifyOTP = async (email, otp) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Không tìm thấy người dùng!");
    if (user.verified) throw new AppError("Tài khoản đã được xác minh!");
    if (user.otp !== otp) throw new AppError("OTP không đúng!");
    if (user.otpExpire < Date.now()) throw new AppError("OTP đã hết hạn!");

    user.verified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return { message: "Xác minh tài khoản thành công" };
};

const resendOTP = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Không tìm thấy người dùng");
    if (user.verified) throw new AppError("Tài khoản đã được xác minh");

    user.otp = generateOTP();
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOTP(email, user.otp);

    return { message: "OTP mới đã được gửi đến email của bạn" };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Không tìm thấy người dùng");
    if (!user.verified) throw new AppError("Tài khoản chưa được xác minh");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AppError("Mật khẩu không đúng");

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
        },
        ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_EXPIRES_IN || "30m" }
    );

    return { token, user };
};

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login,
};
