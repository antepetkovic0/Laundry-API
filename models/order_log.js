module.exports = (sequelize, DataTypes) => {
  const OrderLog = sequelize.define(
    "OrderLog",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
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
    },
    {}
  );

  OrderLog.associate = (models) => {
    OrderLog.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    OrderLog.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
      },
    });
  };

  return OrderLog;
};
