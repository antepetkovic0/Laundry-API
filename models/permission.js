module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "RolePermission",
      foreignKey: "permissionId",
      as: "role",
    });
  };

  return Permission;
};
