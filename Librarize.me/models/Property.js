module.exports = function(sequelize, DataTypes) {
  var property = sequelize.define('property', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        property.belongsTo(models.user);
        property.belongsTo(models.product);
      }
    }
  });
  return property;
};
