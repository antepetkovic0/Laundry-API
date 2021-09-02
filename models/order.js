module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
        primaryKey: true,
      },
      shopId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      productIds: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(
          "CART",
          "PENDING",
          "ACCEPTED",
          "INPROGRESS",
          "PROCESSED",
          "COMPLETED"
        ),
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      total: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Shop, {
      foreignKey: {
        name: "shopId",
      },
    });
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Order.hasMany(models.Order_Log, {
      foreignKey: {
        name: "logId",
      },
    });
  };

  return Order;
};
