module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {}
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Cart.belongsToMany(models.Product, {
      through: "Cart_Item",
      foreignKey: "cartId",
      as: "products",
    });
  };

  return Cart;
};
