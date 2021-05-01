module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: {
        name: "roleId",
        allowNull: false,
      },
      as: "user",
    });
    Role.belongsToMany(models.Permission, {
      through: "RolePermission",
      foreignKey: "roleId",
      as: "permission",
    });
  };

  return Role;
};
