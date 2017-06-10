module.exports = function(sequelize, DataTypes) {
  var friendship = sequelize.define('friendship', {
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
        friendship.belongsTo(models.user, {
          as: 'user1'
        });
        friendship.belongsTo(models.user, {
          as: 'user2'
        });
      }
    }
  });
  return friendship;
};
