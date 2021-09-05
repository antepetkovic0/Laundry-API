module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
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
      orderId: {
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

  return OrderItem;
};
