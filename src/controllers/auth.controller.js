const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const result = await authService.register(email, password, fullName);

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

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await authService.verifyOTP(email, otp);

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

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.resendOTP(email);

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await authService.login(email, password);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            status: "success",
            message: "Đăng nhập thành công"
        });

    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: "error",
            message: error.message
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    return res.status(200).json({
        status: "success",
        message: "Đăng xuất thành công"
    });
};

const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            user: {
                id: req.user.id,
                fullName: req.user.fullName,
                email: req.user.email,
            },
        });

    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    getMe,
};
