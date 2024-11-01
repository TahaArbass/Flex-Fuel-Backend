const userService = require('../services/user.service');

class UserController {
    static async createUser(req, res) {
        try {
            const data = req.body;
            const user = await userService.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await userService.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const user = await userService.updateUser(id, data);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await userService.deleteUser(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const email = req.body.email;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;