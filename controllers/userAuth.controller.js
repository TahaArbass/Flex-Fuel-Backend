const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt/jwt.service');
const UserService = require('../services/user.service');
const CustomError = require('../utils/errors/customError');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');
class UserAuthController {
    static async signUp(req, res, next) {
        try {
            logInfo(req, 'info');
            const data = req.body;

            const isEmailTaken = await UserService.isEmailTaken(data.email);
            if (isEmailTaken) {
                throw new CustomError('Email is already taken', 400);
            }

            const isUsernameTaken = await UserService.isUsernameTaken(data.username);
            if (isUsernameTaken) {
                throw new CustomError('Username is already taken', 400);
            }

            const user = await UserService.createUser(data);
            const token = jwtService.createToken(user);

            // filter the data
            const filteredData = filterGetRequestsData(TABLES.USER, user.role, user);
            res.status(201).json({ token, user: filteredData });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            logInfo(req, 'info');
            const { email, password } = req.body;
            const user = await UserService.getUserByEmail(email);
            // if (!user.isVerified) {
            //     throw new CustomError('Email is not verified', 400);
            // }
            if (!user) {
                throw new CustomError('Invalid credentials', 401);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new CustomError('Invalid credentials', 401);
            }
            const token = jwtService.createToken(user);
            // filter the data
            const filteredData = filterGetRequestsData(TABLES.USER, user.role, user);
            res.status(200).json({ token, user: filteredData });
        } catch (error) {
            next(error);
        }
    }

    // // refresh token
    // static async refreshToken(req, res, next) {
    //     try {
    //         logInfo(req, 'info');
    //         const user = req.user;
    //         const token = jwtService.createToken(user);
    //         res.status(200).json({ token });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

module.exports = UserAuthController;