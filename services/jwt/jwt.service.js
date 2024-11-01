const jwt = require('jsonwebtoken');
require('dotenv').config();

// create token for the user
const createToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

// verify token for authentication
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

// refresh token in case of expiration
const refreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

module.exports = { createToken, verifyToken };