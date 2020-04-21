'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
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
      type: Sequelize.TEXT,
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
    estimatedTime: Sequelize.STRING, //nullable
    materialsNeeded: Sequelize.STRING //nullable
  }, {});
  Course.associate = function(models) {
    Course.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Course;
};

//Within your Course model, define a BelongsTo association between your Course and User models (i.e. a "Course" belongs to a single "User").