// Description: This file contains the middleware function that checks if the user is authenticated or not.

const jwtService = require('../services/jwt/jwt.service');
require('dotenv').config();
const CustomError = require('../utils/errors/customError');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // bearer token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new CustomError('Unauthorized. No token provided.', 401);
    }

    try {
        const decoded = jwtService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;