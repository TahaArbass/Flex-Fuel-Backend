// Description: Error handler middleware for handling errors in the application.
const { logger } = require('../logger');

const errorHandler = (err, req, res, next) => {
    const code = err.code || 500;
    const message = err.message || 'An unexpected error occurred';
    const stackTrace = process.env.NODE_ENV === 'development' ? err.stackTrace : null;

    // Log the error
    logger.error(`${code} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // Send the error response
    res.status(code).json({
        error: {
            message,
            stackTrace
        }
    });
};

module.exports = errorHandler;
