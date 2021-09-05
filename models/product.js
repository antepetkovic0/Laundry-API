module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
      },
      shopId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Shop, {
      foreignKey: {
        name: "shopId",
      },
    });
    Product.belongsToMany(models.Order, {
      through: "OrderItem",
      foreignKey: "productId",
      as: "orders",
    });
  };

  return Product;
};
