// Description: Middleware to check if the user has the required role to access the route.
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !requiredRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
        }

        next();
    };
};

module.exports = roleMiddleware;
