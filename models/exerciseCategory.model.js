/* Exercise Category Model
It acts as a bridge between the exercise and category models.
 It has a many-to-many relationship with the exercise and category models.
 It has the following fields:
    - id: the unique identifier for the exercise category (primary key) (UUID)
    - exercise_id: the unique identifier of the exercise (foreign key) (UUID)
    - category_id: the unique identifier of the category (foreign key) (UUID)
*/

const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');
const Exercise = require('./exercise.model');
const Category = require('./category.model');

// Define the ExerciseCategory model
const ExerciseCategory = sequelize.define('ExerciseCategory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    exercise_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
});

// Link the ExerciseCategory model to the Exercise and Category models
ExerciseCategory.belongsTo(Exercise, { foreignKey: 'exercise_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ExerciseCategory.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = ExerciseCategory;