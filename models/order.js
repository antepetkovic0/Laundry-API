module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      total: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      tax: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      delivery: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      shipping: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      grandTotal: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(
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
    },
    {}
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
    Order.belongsToMany(models.Product, {
      through: "OrderItem",
      foreignKey: "productId",
      as: "products",
    });
    Order.hasMany(models.OrderLog, { as: "logs" });
  };

  return Order;
};
