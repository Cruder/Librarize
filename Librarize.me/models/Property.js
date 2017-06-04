module.exports = function(sequelize, DataTypes) {
  var Property = sequelize.define('Property', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Property.belongsTo(models.User);
        Property.belongsTo(models.Product);
        Property.hasMany(models.Borrow);
      }
    }
  });
  return Property;
};
