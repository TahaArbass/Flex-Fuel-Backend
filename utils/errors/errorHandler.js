const errorHandler = (err, req, res, next) => {
    const code = err.code || 500;
    const message = err.message || 'An unexpected error occurred';
    const stackTrace = process.env.NODE_ENV === 'development' ? err.stackTrace : null;

    res.status(code).json({
        error: {
            message,
            stackTrace
        }
    });
};

module.exports = errorHandler;
