
const Follower = require("../models/follower.model");
const customError = require("../utils/errors/customError");
const ChatService = require("../mongodb/chat/chat.service");
const UserService = require("../services/user.service");
// file for the services related to the followers table
// The services are used to interact with the followers table

class FollowerService {
    /**
     * Get all followers
     * @returns {Promise<Array>} All followers
     */
    static async getAllFollowers() {
        try {
            return await Follower.findAll();
        } catch (error) {
            throw new customError(`Error fetching followers: ${error.message}`);
        }
    }

    /**
     * Get a follower by ID
     * @param {string} id - The ID of the follower entry
     * @returns {Promise<Object|null>} The follower entry or null
     */

    static async getFollowerById(id) {
        try {
            const follower = await Follower.findByPk(id);
            return follower;
        } catch (error) {
            throw new customError(`Error fetching follower by ID: ${error.message}`);
        }
    }

    /**
     * Get all followers of a user (users following `following_id`)
     * @param {string} followingId - The ID of the user being followed
     * @returns {Promise<Array>} List of followers
     */
    static async getFollowersByFollowingId(followingId) {
        try {
            return await Follower.findAll({
                where: { following_id: followingId },
            });
        } catch (error) {
            throw new customError(`Error fetching followers by following ID: ${error.message}`);
        }
    }

    /**
     * Get all users a user is following (`follower_id`)
     * @param {string} followerId - The ID of the user who is following others
     * @returns {Promise<Array>} List of users the given user is following
     */
    static async getFollowingsByFollowerId(followerId) {
        try {
            return await Follower.findAll({
                where: { follower_id: followerId },
            });
        } catch (error) {
            throw new customError(`Error fetching followings by follower ID: ${error.message}`);
        }
    }

    /**
     * Create a new follower entry
     * @param {Object} data - Follower data (follower_id and following_id)
     * @returns {Promise<Object>} The created follower entry
     */
    static async createFollower(data) {
        try {
            const { follower_id, following_id } = data;
            if (!follower_id || !following_id) {
                throw new customError("Follower ID and Following ID are required");
            }
            // check if the follower exists
            const follower = await UserService.getUserById(follower_id);
            if (!follower) {
                throw new customError("Follower not found");
            }
            // check if the followed user exists
            const followedUser = await UserService.getUserById(following_id);
            if (!followedUser) {
                throw new customError("Followed user not found");
            }
            // check if he is trying to follow himself
            if (follower_id === following_id) {
                throw new customError("You cannot follow yourself");
            }


            // a promise to create a follower and the chat room
            // if one of them fails, the other will not be created
            return await Follower.sequelize.transaction(async (t) => {
                const follower = await Follower.create(data, { transaction: t });
                const chat = await ChatService.addChat([follower_id, following_id], t);
                return { follower, chat_id: chat.chat_id };
            });
        } catch (error) {
            throw new customError(`Error creating follower: ${error.message}`);
        }
    }

    /**
     * Update a follower entry by ID
     * @param {string} id - The ID of the follower entry
     * @param {Object} data - Updated follower data
     * @returns {Promise<Object|null>} The updated follower entry or null if not found
     */

    static async updateFollower(id, data) {
        try {
            const { follower_id, following_id } = data;
            if (!follower_id || !following_id) {
                throw new customError("Follower ID and Following ID are required");
            }
            // check if the follower exists
            const follower = await UserService.getUserById(follower_id);
            if (!follower) {
                throw new customError("Follower not found");
            }
            // check if the followed user exists
            const followedUser = await UserService.getUserById(following_id);
            if (!followedUser) {
                throw new customError("Followed user not found");
            }
            // check if he is trying to follow himself
            if (follower_id === following_id) {
                throw new customError("You cannot follow yourself");
            }

            // find the chat room between the follower and the followed user
            const chat = await ChatService.getChatByParticipants([follower_id, following_id]);
            if (!chat) {
                throw new customError("Chat room not found");
            }
            // a promise to update the follower and the chat room
            // if one of them fails, the other will not be updated
            return await Follower.sequelize.transaction(async (t) => {
                await follower.update({ follower_id, following_id }, { transaction: t });
                await chat.update({ participants: [follower_id, following_id] }, { transaction: t });
                return { follower, chat_id: chat.chat_id };
            });
        } catch (error) {
            throw new customError(`Error updating follower: ${error.message}`);
        }
    }

    /**
     * Delete a follower entry by ID
     * @param {string} id - The ID of the follower entry
     * @returns {Promise<boolean>} True if deleted, false otherwise
     */

    static async deleteFollower(id) {
        try {
            const follower = await Follower.findByPk(id);
            if (!follower) {
                throw new customError("Follower not found");
            }

            // get the chat room between the follower and the followed user
            const chat = await ChatService.getChatByParticipants([follower.follower_id, follower.following_id]);
            if (!chat) {
                throw new customError("Chat room not found");
            }
            // a promise to delete the follower and the chat room
            // if one of them fails, the other will not be deleted
            return await Follower.sequelize.transaction(async (t) => {
                chat.destroy({ transaction: t });
                follower.destroy({ transaction: t });
                return true;
            });
        } catch (error) {
            throw new customError(`Error deleting follower: ${error.message}`);
        }
    }

    // helper function to check if a user is already following another user
    static async isFollowing(followerId, followingId) {
        try {
            const follower = await Follower.findOne({
                where: { follower_id: followerId, following_id: followingId },
            });
            return !!follower;
        } catch (error) {
            throw new customError(`Error checking if user is following: ${error.message}`);
        }
    }
}

module.exports = FollowerService;
