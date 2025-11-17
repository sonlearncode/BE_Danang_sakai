const validate = (schema) => (req, res, next) => {
    const objectToValidate = {
        body: req.body,
        params: req.params,
        query: req.query,
    };

    const { error } = schema.validate(objectToValidate, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        const errorMessages = error.details
            .map((detail) => detail.message)
            .join(', ');
        return res
            .status(400)
            .json({ message: `Validation error: ${errorMessages}` });
    }

    return next();
};

module.exports = { validate };