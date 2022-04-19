module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expiryDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        as: "user",
      },
    });
  };

  return RefreshToken;
};
