module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  // User.associate = (models) => {
  //   User.belongsTo(models.Role, {
  //     foreignKey: {
  //       name: "roleId",
  //       allowNull: false,
  //     },
  //     as: "role",
  //   });
  // };

  return User;
};
