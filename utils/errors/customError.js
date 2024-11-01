// errors/CustomError.js
class CustomError extends Error {
    constructor({ message, code = 500 }) {
        super(message);
        this.code = code;                        // HTTP status code (e.g., 404, 400, etc.)
        this.status = this.getStatus(code)       // HTTP status message (e.g., 'Not Found', 'Bad Request', etc.)

        // Only include stack trace if in development mode
        if (process.env.NODE_ENV === 'development') {
            this.stackTrace = this.stack;
        } else {
            this.stackTrace = null;
        }
    }

    // function to get the status 
    getStatus(code) {
        switch (code) {
            case 200:
                return 'OK';
            case 201:
                return 'CREATED';
            case 204:
                return 'NO_CONTENT';
            case 400:
                return 'BAD_REQUEST';
            case 401:
                return 'UNAUTHORIZED';
            case 403:
                return 'FORBIDDEN';
            case 404:
                return 'NOT_FOUND';
            case 405:
                return 'METHOD_NOT_ALLOWED';
            case 409:
                return 'CONFLICT';
            case 422:
                return 'UNPROCESSABLE_ENTITY';
            case 429:
                return 'TOO_MANY_REQUESTS';
            case 500:
                return 'INTERNAL_SERVER_ERROR';
            case 503:
                return 'SERVICE_UNAVAILABLE';
            default:
                return 'INTERNAL_SERVER_ERROR';
        }
    }
}

module.exports = CustomError;
