/*
    This file contains the model for the user.
    The user model has the following attributes:
    - id: UUID (primary key) : identifier for the user
    - username: string (unique) : username of the user
    - email: string (unique) : email of the user
    - password: string : password of the user
    - role: ENUM (user, admin) : role of the user (default: user)
    - profile_url: string : URL of the user's profile picture
    - gender: ENUM (male, female) : gender of the user
    - age: integer : age of the user
    - weight: integer : weight of the user (in kg) to track the user's BMI
         and his weight loss journey
    - height: integer : height of the user (in cm) to track the user's BMI
    - isVerified: boolean : status of the user's verification (default: false)

    ************************************************************************************
    The user model also has the following hooks:
    - beforeCreate: hash the password before creating the user
    - beforeUpdate: hash the password before updating the user
    ************************************************************************************
*/


const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/configSqlz');
require('dotenv').config();

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male, female'),
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    wight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = parseInt(process.env.SALT_ROUNDS);
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = parseInt(process.env.SALT_ROUNDS);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

module.exports = User;
