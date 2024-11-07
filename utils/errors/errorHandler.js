const { logger, logInfo } = require('../logger');
const CustomError = require('./customError');

const errorHandler = (err, req, res, next) => {
    const isCustomError = err instanceof CustomError;
    const code = isCustomError ? err.code : 500;

    // Customize the message for non-custom errors, especially for development
    const message = isCustomError
        ? err.message
        : (process.env.NODE_ENV === 'development'
            ? `Unexpected Error: ${err.message || 'An unknown error occurred'}`
            : 'An unexpected server error occurred');

    const stackTrace = process.env.NODE_ENV === 'development' ? (isCustomError ? err.stackTrace : err.stack) : null;

    // Log error details including the original error message and stack
    logger.error({
        code,
        message: err.message || 'Unknown error',
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: stackTrace
    });

    logInfo(req, 'error');

    // Send detailed response in development, generic in production
    res.status(code).json({
        error: {
            message,
            status: isCustomError ? err.status : 'INTERNAL_SERVER_ERROR',
            stackTrace
        }
    });
};

module.exports = errorHandler;
