module.exports = (sequelize, DataTypes) => {
  const Order_Item = sequelize.define(
    "Order_Item",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );

  return Order_Item;
};
