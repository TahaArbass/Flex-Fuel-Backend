// Description: Middleware to check if the user has the required role to access the route.
const CustomError = require('../utils/errors/customError');

const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !requiredRoles.includes(user.role)) {
            return next(new CustomError('Unauthorized Action. You do not have the required role.', 403));
        }

        next();
    };
};

module.exports = roleMiddleware;
