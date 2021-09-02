module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
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
