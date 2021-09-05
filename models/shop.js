module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ownerId: {
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
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Shop.associate = (models) => {
    Shop.belongsTo(models.User, {
      foreignKey: {
        name: "ownerId",
      },
    });
    Shop.hasMany(models.Product, { as: "products" });
    Shop.hasMany(models.Order, { as: "orders" });
  };

  return Shop;
};
