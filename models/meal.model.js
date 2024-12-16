const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');

// Define the Meal model
const Meal = sequelize.define('Meal', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    steps: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Low-Fat', 'High-Protein', 'Balanced'),
        allowNull: false,
        defaultValue: 'Balanced',
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Meal;