module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      hash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "ACTIVE", "DISABLED"),
        allowNull: false,
      },
      pwdResetToken: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );

  User.associate = (models) => {
    User.hasOne(models.Shop, {
      foreignKey: {
        name: "shopId",
      },
    });
    User.hasMany(models.Order, {
      foreignKey: {
        name: "orderId",
      },
    });
    User.hasMany(models.Order_Log, {
      foreignKey: {
        name: "logId",
      },
    });
  };

  return User;
};
