const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');

// Define the Follower model for the 'followers' table
// The 'followers' table is used to store the followers of a user
const Follower = sequelize.define('followers', {
    id: {
        type: DataTypes.UUID, // UUID for unique IDs
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users", // Reference the Users table
            key: "id",
        },
        onDelete: "CASCADE", // Clean up when the user is deleted
    },
    following_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users", // Reference the Users table
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    timestamps: true, // createdAt and updatedAt columns
});

module.exports = Follower;