const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomError = require('../../utils/errors/customError');

// create token for the user
const createToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    });
}

// verify token for authentication
const verifyToken = (token) => {
    try {
        if (!token) {
            throw new CustomError('Unauthorized. No token provided.', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new CustomError('Unauthorized. Token expired.', 401); // token expired
        }
        throw (error);
    }

}

// refresh token in case of expiration
const refreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    });
}

module.exports = { createToken, verifyToken, refreshToken };