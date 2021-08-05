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
    Role.belongsTo(models.User, {
      foreignKey: {
        name: "roleId",
        allowNull: false,
      },
      as: "roles",
    });
    Role.belongsToMany(models.Permission, {
      through: "RolePermission",
      foreignKey: "roleId",
      as: "permissions",
    });
  };

  return Role;
};