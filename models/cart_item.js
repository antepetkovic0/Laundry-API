module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
      },
      productId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      cartId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );

  return CartItem;
};
