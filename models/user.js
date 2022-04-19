module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      // roleId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      displayName: {
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDING", "ACTIVE", "DISABLED"),
      },
    },
    {}
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      as: "role",
      // foreignKey: {
      //   name: "roleId",
      //   allowNull: false,
      // },
    });
    User.hasOne(models.RefreshToken, { as: "refreshToken" });
    User.hasMany(models.Shop, { as: "shops" });
    User.hasMany(models.Order, { as: "orders" });
  };

  return User;
};
