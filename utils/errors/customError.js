// errors/CustomError.js
require('dotenv').config();

class CustomError extends Error {
    constructor(message = 'An unexpected error occurred', code = 500) {
        super(message);
        this.code = code;                          // HTTP status code (e.g., 404, 400, etc.)
        this.status = this.getStatus(code);         // HTTP status message (e.g., 'Not Found', 'Bad Request', etc.)
        this.stackTrace = process.env.NODE_ENV === 'development' ? this.stack : null; // Include stack trace only in development
    }

    // Method to get the HTTP status message based on the code
    getStatus(code) {
        const statusMessages = {
            200: 'OK',
            201: 'CREATED',
            204: 'NO_CONTENT',
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            405: 'METHOD_NOT_ALLOWED',
            409: 'CONFLICT',
            422: 'UNPROCESSABLE_ENTITY',
            429: 'TOO_MANY_REQUESTS',
            500: 'INTERNAL_SERVER_ERROR',
            503: 'SERVICE_UNAVAILABLE',
        };
        return statusMessages[code] || 'INTERNAL_SERVER_ERROR';
    }
}

module.exports = CustomError;
