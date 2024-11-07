/* This file contains the model for the Muscle entity, it defines the table schema 
and its associations with other models. 
The Muscle model has the following attributes:
- id: UUID (primary key) : identifier for the muscle
- muscle_name: string : name of the muscle
- muscle_description: string : description of the muscle
- muscle_group_id: UUID : foreign key to the MuscleGroup model
************************************************************************************
The Muscle model also has the following associations:
- belongsTo: MuscleGroup : a muscle belongs to a muscle group
************************************************************************************
*/

const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');
const MuscleGroup = require('./muscleGroup.model');

// Define the Muscle model , it belongs to the MuscleGroup model
const Muscle = sequelize.define('Muscle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    muscle_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    muscle_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    muscle_group_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
});

Muscle.belongsTo(MuscleGroup, {
    foreignKey: 'muscle_group_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

module.exports = Muscle;