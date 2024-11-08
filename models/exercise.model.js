/* This file defines the Exercise model, which represents an exercise that targets a specific muscle.
The Exercise model has the following attributes:
- id: the unique identifier for the exercise (primary key)
- exercise_name: the name of the exercise
- exercise_description: a description of the exercise
- exercise_steps: the steps to perform the exercise
- photo_url: the URL of a photo of the exercise
- video_url: the URL of a video of the exercise
- targeted_muscle_id: the unique identifier of the muscle targeted by the exercise (foreign key)
The Exercise model is linked to the Muscle model through the targeted_muscle_id attribute,
 which is a foreign key that references the id attribute of the Muscle model.
 ***********************************************************************************************
 */

const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');
const Muscle = require('./muscle.model');

// Define the Exercise model
const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    exercise_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exercise_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exercise_steps: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    targeted_muscle_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
});

// Link the Exercise model to the Muscle model
Exercise.belongsTo(Muscle, { foreignKey: 'targeted_muscle_id' });

module.exports = Exercise;