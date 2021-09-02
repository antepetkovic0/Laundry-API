module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      shopId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      about: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Shop.associate = (models) => {
    Shop.belongsTo(models.User, {
      foreignKey: {
        name: "id",
      },
    });
    Shop.hasMany(models.Product, {
      foreignKey: {
        name: "shopId",
      },
    });
  };

  return Shop;
};
