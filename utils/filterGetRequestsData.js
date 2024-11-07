// filter fields based on the WHITELIST structure.
const CustomError = require('./errors/customError');
const { ACTIONS } = require('./staticData');
const whitelist = require('./whiteList.json');

const filterGetRequestsData = (entity, role, dataToFilter) => {
    if (!entity || !role || !dataToFilter) {
        throw new CustomError({
            message: 'Entity, role, and dataToFilter are required',
            code: 400,
        });
    }
    // Fetch allowed fields for the specified entity and role
    const allowedFields = whitelist[entity]?.[ACTIONS.GET]?.[role];

    // Check if allowed fields exist; throw error if not authorized
    if (!allowedFields) {
        throw new CustomError(
            `Unauthorized action: ${ACTIONS.GET} on ${entity}`, 403
        );
    }

    // Determine if dataToFilter is an array or a single object
    const isArray = Array.isArray(dataToFilter);

    // Standardize to always work with arrays for easier handling
    const dataArray = isArray ? dataToFilter : [dataToFilter];

    // Map over the data and filter out only allowed fields, checking if data is a Sequelize instance
    const filteredDataArray = dataArray.map(data => {
        const dataValues = data.dataValues ? data.dataValues : data; // Use dataValues if it's a Sequelize instance
        return Object.keys(dataValues)
            .filter(field => allowedFields.includes(field))
            .reduce((obj, key) => {
                obj[key] = dataValues[key];
                return obj;
            }, {});
    });

    // Return as array if dataToFilter was an array, or single object otherwise
    return isArray ? filteredDataArray : filteredDataArray[0];
};

module.exports = filterGetRequestsData;
