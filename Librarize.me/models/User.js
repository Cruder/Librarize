module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Product, {
          through: "Property"
        });
        User.belongsToMany(User, {
          through: 'Priendship',
          as: 'Friends'
        });
        User.belongsToMany(models.Borrow, {
          through: 'Property'
        });
        User.hasMany(models.Borrow);
      }
    }
  });
  return User;
};
