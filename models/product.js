module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shopId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {}
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Shop, {
      foreignKey: {
        name: "id",
      },
    });
  };

  return Product;
};
