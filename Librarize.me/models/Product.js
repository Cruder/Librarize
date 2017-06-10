module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
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
    freezeTableName: true
  });
  return product;
};
