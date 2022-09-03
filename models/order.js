module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        as: "shop",
      },
    });
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Order.belongsToMany(models.Product, {
      through: "Order_Item",
      foreignKey: "orderId",
      as: "products",
    });
  };

  return Order;
};
