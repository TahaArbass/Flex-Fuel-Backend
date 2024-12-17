const UserService = require('../services/user.service');
const CustomError = require('../utils/errors/customError');
const { logInfo } = require('../utils/logger');
const filterGetRequestsData = require('../utils/filterGetRequestsData');
const { TABLES } = require('../utils/staticData');
class UserController {
    static async createUser(req, res, next) {
        try {
            logInfo(req, 'info');
            const data = req.body;
            const user = await UserService.createUser(data);

            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, user);

            res.status(201).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            logInfo(req, 'info');
            const users = await UserService.getAllUsers();
            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, users);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            const user = await UserService.getUserById(id);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, user);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // Get user by username
    static async getUserByUsername(req, res, next) {
        try {
            logInfo(req, 'info');
            const username = req.params.username;
            const user = await UserService.getUserByUsername(username);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, user);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    // Get user by email
    static async getUserByEmail(req, res, next) {
        try {
            logInfo(req, 'info');
            const email = req.params.email;
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, user);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            const data = req.body;
            const user = await UserService.updateUser(id, data);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            // filter the data
            const role = req.user.role;
            const filteredData = filterGetRequestsData(TABLES.USER, role, user);
            res.status(200).json(filteredData);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            logInfo(req, 'info');
            const id = req.params.id;
            const user = await getUserById(id);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            await UserService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // count all users
    static async countAllUsers(req, res) {
        try {
            logInfo(req, 'info');
            const count = await UserService.countAllUsers();
            res.status(200).json({ count });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;