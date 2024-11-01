/* This file contains the user services.
**************************************************
*/

const user = require('../models/user.model');

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

    static async updateUser(id, data) {
        try {
            const userToUpdate = await user.findByPk(id);
            if (userToUpdate) {
                await userToUpdate.update(data);
                return userToUpdate;
            }
            return null;
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
}

module.exports = UserService;