const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Гость',
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },


    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });


module.exports = User;