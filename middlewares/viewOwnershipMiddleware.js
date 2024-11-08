/* This middleware checks if the authenticated user is an admin 
or the owner of the data they are trying to modify. */

const CustomError = require('../utils/errors/customError');
const { ROLES } = require('../utils/staticData');

const verifyOwnershipMiddleware = () => (req, res, next) => {
    const userIdToUpdate = req.params.id; // The ID of the target user
    const authenticatedUserId = req.user.id; // ID of the logged-in user
    const role = req.user.role; // User role (e.g., 'user', 'admin')

    // Non-admins can only modify their own data
    if (role !== ROLES.ADMIN && userIdToUpdate !== authenticatedUserId) {
        return next(new CustomError('Unauthorized Action. You do not have the ownership rights.', 403));
    }

    next();
};

module.exports = verifyOwnershipMiddleware;
