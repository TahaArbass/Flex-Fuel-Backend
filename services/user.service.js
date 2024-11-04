/* This file contains the User services.
**************************************************
*/

const User = require('../models/User.model');
const CustomError = require('../utils/errors/customError');
class UserService {
    // create a new User
    static async createUser(data) {
        try {
            return await User.create(data);
        } catch (error) {
            throw error;
        }
    }

    // get all Users
    static async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error) {
            throw error;
        }
    }

    // get User by id
    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user)
                throw new CustomError('User not found', 404);

            return user;
        } catch (error) {
            throw error;
        }
    }

    // get User by email
    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user)
                throw new CustomError('User not found', 404);

            return user;
        } catch (error) {
            throw error;
        }
    }

    // get User by Username
    static async getUserByUsername(username) {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user)
                throw new CustomError('User not found', 404);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // update User by id
    static async updateUser(id, data) {
        try {
            const UserToUpdate = await User.findByPk(id);
            if (!UserToUpdate)
                throw new CustomError('User not found', 404);

            return await UserToUpdate.update(data);
        } catch (error) {
            throw error;
        }
    }

    // delete User by id
    static async deleteUser(id) {
        try {
            const UserToDelete = await User.findByPk(id);
            if (!UserToDelete)
                throw new CustomError('User not found', 404);

            await UserToDelete.destroy();
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

    // check if Username is already taken
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