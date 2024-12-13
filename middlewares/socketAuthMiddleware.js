const jwtService = require('../services/jwt/jwt.service');  // Assuming jwtService has a verifyToken method
const CustomError = require('../utils/errors/customError');  // Assuming you have a CustomError class for handling errors

const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.query.token;  // Get token from query params (sent when connecting)
    if (!token) {
        return next(new CustomError('Unauthorized. No token provided.', 401));
    }

    try {
        const decoded = jwtService.verifyToken(token);  // Verify token using your JWT service
        socket.user = decoded;  // Attach user data to socket object
        next();  // Proceed to the next middleware or event handler
    } catch (error) {
        return next(new CustomError('Unauthorized. Invalid token.', 401));  // Handle invalid token
    }
};

module.exports = socketAuthMiddleware;
