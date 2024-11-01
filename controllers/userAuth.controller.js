const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt/jwt.service');
const userService = require('../services/user.service');
const CustomError = require('../utils/errors/customError');

class UserAuthController {
    static async signUp(req, res, next) {
        try {
            const data = req.body;

            const isEmailTaken = await userService.isEmailTaken(data.email);
            if (isEmailTaken) {
                throw new CustomError({ message: 'Email is already taken', code: 400 });
            }

            const isUsernameTaken = await userService.isUsernameTaken(data.username);
            if (isUsernameTaken) {
                throw new CustomError({ message: 'Username is already taken', code: 400 });
            }

            const user = await userService.createUser(data);
            const token = jwtService.createToken(user);
            res.status(201).json({ token, user });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                throw new CustomError({ message: 'Invalid credentials', code: 401 });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new CustomError({ message: 'Invalid credentials', code: 401 });
            }
            const token = jwtService.createToken(user);
            res.status(200).json({ token, user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserAuthController;