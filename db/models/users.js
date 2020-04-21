'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "First Name"'
        },
        notEmpty: {
          msg: 'Provide a value for "First Name"'
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "Last Name"'
        },
        notEmpty: {
          msg: 'Provide a value for "Last Name"'
        },
      },
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "Email Address"'
        },
        notEmpty: {
          msg: 'Provide a value for "Email Address"'
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "Password"'
        },
        notEmpty: {
          msg: 'Provide a value for "Password"'
        },
      },
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Course);
  };
  return User;
};

//Within your User model, define a HasMany association between your User and Course models (i.e. a "User" has many "Courses").