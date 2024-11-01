// Description: Middleware to check if the user has the required role to access the route.

const customError = require('../utils/errors/customError');
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !requiredRoles.includes(user.role)) {
            return next(new customError({
                message: 'You do not have the required role to perform this action.',
                status: 401
            }));
        }

        next();
    };
};

module.exports = roleMiddleware;
