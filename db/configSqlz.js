/* This file contains the configuration for the Sequelize ORM.
   The configuration includes the following:
   - Database name
   - Database user
   - Database password
   - Database host
   - Database port
   - Database dialect
   - Connection to the database
   - Synchronization of the Sequelize models with the database
   ************************************************************
*/

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

sequelize.sync().then(() => {
    console.log('Sequelize models synchronized with the database');
}
);

module.exports = sequelize;