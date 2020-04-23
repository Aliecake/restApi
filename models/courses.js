'use strict';
const {Sequelize, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "Title"'
        },
        notEmpty: {
          msg: 'Provide a value for "Title"'
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Provide a value for "Description"'
        },
        notEmpty: {
          msg: 'Provide a value for "Description"'
        },
      },
    },
    estimatedTime: DataTypes.STRING, //nullable
    materialsNeeded: DataTypes.STRING //nullable
  }, {});
  Course.associate = function(models) {
    Course.hasMany(models.User, {
      foreignKey: {
        fieldName: `userId`,
        allowNull: true
      }
    });
  };
  return Course;
};

//Within your Course model, define a BelongsTo association between your Course and User models (i.e. a "Course" belongs to a single "User").