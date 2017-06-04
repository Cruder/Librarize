module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define('Friendship', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.ENUM('Refused', 'Accepted', 'Waiting', 'Canceled')
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Friendship.belongsTo(models.User, {
          as: 'user1'
        });
        Friendship.belongsTo(models.User, {
          as: 'user2'
        });
      }
    }
  });
  return Friendship;
};
