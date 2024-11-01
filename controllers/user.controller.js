const userService = require('../services/user.service');
const CustomError = require('../utils/errors/customError');

class UserController {
    static async createUser(req, res, next) {
        try {
            const data = req.body;
            const user = await userService.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const id = req.params.id;
            const user = await userService.getUserById(id);
            if (!user) {
                throw new CustomError({ message: 'User not found', code: 404 });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(error);
        }
    }

    // Get user by username
    static async getUserByUsername(req, res, next) {
        try {
            const username = req.params.username;
            const user = await userService.getUserByUsername(username);
            if (!user) {
                throw new CustomError({ message: 'User not found', code: 404 });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(error);
        }
    }

    // Get user by email
    static async getUserByEmail(req, res, next) {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                throw new CustomError({ message: 'User not found', code: 404 });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const user = await userService.updateUser(id, data);
            if (!user) {
                throw new CustomError({ message: 'User not found', code: 404 });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const user = await getUserById(id);
            if (!user) {
                throw new CustomError({ message: 'User not found', code: 404 });
            }
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;