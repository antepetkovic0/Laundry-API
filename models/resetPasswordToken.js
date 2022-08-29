module.exports = (sequelize, DataTypes) => {
  const ResetPasswordToken = sequelize.define(
    "ResetPasswordToken",
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

  ResetPasswordToken.associate = (models) => {
    ResetPasswordToken.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        as: "user",
      },
    });
  };

  return ResetPasswordToken;
};
