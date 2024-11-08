/* This file contains the routes for the user entity
**************************************************
*/

const userController = require('../controllers/user.controller');
const userAuthController = require('../controllers/userAuth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/staticData');
const roleMiddleware = require('../middlewares/roleMiddleware');
const viewOwnershipMiddleware = require('../middlewares/viewOwnershipMiddleware');
const express = require('express');

const router = express.Router();

// Get all users
router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.getAllUsers);
// Get user by id, email, or username
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/email/:email', authMiddleware, userController.getUserByEmail);
router.get('/username/:username', authMiddleware, userController.getUserByUsername);

// Create, update, and delete users
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN), userController.createUser);
router.put('/:id', authMiddleware, viewOwnershipMiddleware(), userController.updateUser);
router.delete('/:id', authMiddleware, viewOwnershipMiddleware(), userController.deleteUser);

// User authentication routes (signup and login)
router.post('/signup', userAuthController.signUp);
router.post('/login', userAuthController.login);

module.exports = router;
