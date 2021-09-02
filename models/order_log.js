module.exports = (sequelize, DataTypes) => {
  const Order_Log = sequelize.define(
    "Order_Log",
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );

  Order_Log.associate = (models) => {
    Order_Log.hasOne(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Order_Log.hasOne(models.Order, {
      foreignKey: {
        name: "orderId",
      },
    });
  };

  return Order_Log;
};
