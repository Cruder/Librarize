'use strict'
var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    instanceMethods: {
      responsify: function() {
        let result = {};
        result.id = this.id;
        result.lastname = this.lastname;
        result.firstname = this.firstname;
        result.email = this.email;
        return result;
      }
    },
    hooks: {
      beforeCreate: function(user) {
        user.password = passwordHash.generate(user.password);
      }
    }
  });
  return user;
};
