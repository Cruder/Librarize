module.exports = function(sequelize, DataTypes) {
  var borrow = sequelize.define('borrow', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    until: {
      type: DataTypes.DATE
    },
    state: {
      type: DataTypes.ENUM('Refused', 'Accepted', 'Waiting', 'Canceled')
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        borrow.belongsTo(models.user, {
          as: 'to'
        });
        borrow.belongsTo(models.property);
      }
    }
  });
  return borrow;
};
