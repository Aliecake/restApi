const { Sequelize, Model } = require(`sequelize`);

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Provide First Name`
                },
                notNull: {
                    msg: `Provide First Name`
                }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Provide Last Name`
                },
                notNull: {
                    msg: `Provide First Name`
                }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Provide Email Address`
                },
                notNull: {
                    msg: `Provide Email Address`
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Provide Password`
                },
                notNull: {
                    msg: `Provide Password`
                }
            }
        }
    }, {
        sequelize
    })
    User.associate = (models) => {
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: `userId`,
          allowNull: false
        }
      });
    };
    return User;
}