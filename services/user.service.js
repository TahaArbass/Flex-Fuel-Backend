/* This file contains the user services.
**************************************************
*/

const user = require('../models/user.model');
const customError = require('../utils/errors/customError');
class UserService {
    static async createUser(data) {
        try {
            return await user.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await user.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            if (!id) return null;
            return await user.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await user.findOne({ where: { email } });
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            return await user.findOne({ where: { username } });
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, data) {
        try {
            const userToUpdate = await user.findByPk(id);
            if (!userToUpdate)
                throw new customError({ message: 'User not found', status: 404 });

            return await userToUpdate.update(data);
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const userToDelete = await user.findByPk(id);
            if (userToDelete) {
                await userToDelete.destroy();
            }
        } catch (error) {
            throw error;
        }
    }

    // check if email is already taken
    static async isEmailTaken(email) {
        try {
            const user = await getUserByEmail(email);
            return !!user;
        } catch (error) {
            throw error;
        }
    }

    // check if username is already taken
    static async isUsernameTaken(username) {
        try {
            const user = await getUserByUsername(username);
            return !!user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;