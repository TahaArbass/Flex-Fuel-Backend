/* This file contains the model for the muscle group table in the database.
The MuscleGroup model has the following attributes:
- id: UUID (primary key) : identifier for the muscle group
- muscle_group_name: string : name of the muscle group
************************************************************************************
*/


const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');

// Define the MuscleGroup model
const MuscleGroup = sequelize.define('MuscleGroup', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    muscle_group_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = MuscleGroup;