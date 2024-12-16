const FollowerService = require("../services/follower.service");
const UserService = require("../services/user.service");
const CustomError = require("../utils/errors/customError");
const { logInfo } = require("../utils/logger");
class FollowerController {
    // Get all followers
    static async getAllFollowers(req, res, next) {
        try {
            logInfo(req, "info");
            const followers = await FollowerService.getAllFollowers();
            return res.status(200).json(followers);
        } catch (error) {
            next(error);
        }
    }

    // Get a follower by ID
    static async getFollowerById(req, res, next) {
        try {
            logInfo(req, "info");
            const id = req.params.id;
            if (!id) {
                throw new CustomError("Please provide a follower ID", 400);
            }
            const follower = await FollowerService.getFollowerById(id);
            if (!follower) {
                throw new CustomError("Follower not found", 404);
            }
            return res.status(200).json(follower);
        } catch (error) {
            next(error);
        }
    }

    // Get all followers of a user (by `following_id`)
    static async getFollowersByFollowingId(req, res, next) {
        try {
            logInfo(req, "info");
            const followingId = req.params.followingId;
            if (!followingId) {
                throw new CustomError("Please provide a following ID", 400);
            }
            const followers = await FollowerService.getFollowersByFollowingId(followingId);
            return res.status(200).json(followers);
        } catch (error) {
            next(error);
        }
    }

    // Get all users a user is following (by `follower_id`)
    static async getFollowingsByFollowerId(req, res, next) {
        try {
            logInfo(req, "info");
            const followerId = req.params.followerId;
            if (!followerId) {
                throw new CustomError("Please provide a follower ID", 400);
            }
            const followings = await FollowerService.getFollowingsByFollowerId(followerId);
            return res.status(200).json(followings);
        } catch (error) {
            next(error);
        }
    }

    // Create a new follower
    static async createFollower(req, res, next) {
        try {
            logInfo(req, "info");
            const { follower_id, following_id } = req.body;
            if (!follower_id || !following_id) {
                throw new CustomError("Follower ID and Following ID are required", 400);
            }
            const newFollower = await FollowerService.createFollower({ follower_id, following_id });
            return res.status(201).json(newFollower);
        } catch (error) {
            next(error);
        }
    }

    // Update a follower
    static async updateFollower(req, res, next) {
        try {
            logInfo(req, "info");
            const id = req.params.id;
            if (!id) {
                throw new CustomError("Please provide a follower ID", 400);
            }
            const data = req.body;
            const updatedFollower = await FollowerService.updateFollower(id, data);
            return res.status(200).json(updatedFollower);
        } catch (error) {
            next(error);
        }
    }

    // Delete a follower
    static async deleteFollower(req, res, next) {
        try {
            logInfo(req, "info");
            const id = req.params.id;
            if (!id) {
                throw new CustomError("Please provide a follower ID", 400);
            }
            await FollowerService.deleteFollower(id);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    // helper function to check if a user is already following another user
    static async isFollowing(req, res, next) {
        try {
            logInfo(req, "info");
            const follower_id = req.params.followerId;
            const following_id = req.params.followingId;
            if (!follower_id || !following_id) {
                throw new CustomError("Follower ID and Following ID are required", 400);
            }
            const isFollowing = await FollowerService.isFollowing(follower_id, following_id);
            return res.status(200).json({ isFollowing });
        } catch (error) {
            next(error);
        }
    }

    // helper function to get the followers info for a user
    static async getFollowersInfo(req, res, next) {
        try {
            logInfo(req, "info");
            const userId = req.params.followerId;
            if (!userId) {
                throw new CustomError("Please provide a user ID", 400);
            }
            const followersInfo = await FollowerService.getFollowingsByFollowerId(userId);
            // for each follower, get the user info
            const followers = await Promise.all(
                followersInfo.map(async (follower) => {
                    const user = await UserService.getUserById(follower.following_id);
                    return user.dataValues;
                })
            );
            return res.status(200).json(followers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = FollowerController;
