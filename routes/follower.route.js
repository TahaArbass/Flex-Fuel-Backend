const express = require("express");
const FollowerController = require("../controllers/follower.controller");
const router = express.Router();

// Routes for the followers table
// get all followers
router.get("/", FollowerController.getAllFollowers);

// get a follower by ID
router.get("/:id", FollowerController.getFollowerById);

// get all followers of a user (users following `following_id`)
router.get("/following/:followingId", FollowerController.getFollowersByFollowingId);

// get all users a user is following (`follower_id`)
router.get("/follower/:followerId", FollowerController.getFollowingsByFollowerId);

// create a new follower
router.post("/", FollowerController.createFollower);

// update a follower
router.put("/:id", FollowerController.updateFollower);

// delete a follower
router.delete("/:id", FollowerController.deleteFollower);

module.exports = router;
