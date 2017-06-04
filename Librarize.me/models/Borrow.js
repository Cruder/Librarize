module.exports = function(sequelize, DataTypes) {
  var Borrow = sequelize.define('Borrow', {
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
        Borrow.belongsTo(models.User, {
          as: 'to'
        });
        Borrow.belongsTo(models.User, {
          through: 'Property'
        });
        Borrow.belongsTo(models.Product, {
          through: 'Property'
        });
        Borrow.belongsTo(models.Property);
      }
    }
  });
  return Borrow;
};
