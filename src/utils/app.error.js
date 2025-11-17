class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
