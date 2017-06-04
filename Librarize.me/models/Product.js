module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.ENUM('Music', 'Movie', 'Book', 'Game')
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Product.belongsToMany(models.User, {
          through: "Property"
        });
        Product.belongsToMany(models.Borrow, {
          through: "Property"
        });
      }
    }
  });
  return Product;
};
