const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;