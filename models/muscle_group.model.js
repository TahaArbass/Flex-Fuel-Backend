const sequelize = require('../db/configSqlz');
const { DataTypes } = require('sequelize');

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
});

module.exports = MuscleGroup;