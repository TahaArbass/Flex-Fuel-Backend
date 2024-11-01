/* This file contains the routes for the user entity
**************************************************
*/


const userController = require('../controllers/user.controller');
const userAuthController = require('../controllers/userAuth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/staticData');
const roleMiddleware = require('../middlewares/roleMiddleware');
const express = require('express');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN]), userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

router.post('/signup', userAuthController.signUp);
router.post('/login', userAuthController.login);

module.exports = router;
