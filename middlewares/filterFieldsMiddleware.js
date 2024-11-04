const whitelist = require('../utils/whiteList.json');
const CustomError = require('../utils/errors/customError');

/**
 * Middleware to filter fields based on the WHITELIST structure.
 * @param {String} entity - The name of the entity/table (e.g., 'users').
 * @param {String} action - The action being performed ('create', 'update', 'get').
 */
const filterFields = (entity, action) => (req, res, next) => {
    const role = req.user.role;
    const allowedFields = whitelist[entity]?.[action]?.[role];

    if (!allowedFields) {
        return next(new CustomError(`Unauthorized action: ${action} on ${entity}`, 403));
    }

    // If it's an update or create action, filter req.body
    if (action === 'create' || action === 'update') {
        req.body = Object.keys(req.body)
            .filter(field => allowedFields.includes(field))
            .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});
    }

    // If no permitted fields remain, prevent the action
    if (Object.keys(req.body).length === 0 && (action === 'create' || action === 'update')) {
        return next(new CustomError({ code: 403, message: `No permitted fields to ${action}` }));
    }

    next();
};

module.exports = filterFields;
