module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: "users",
    });
    Role.belongsToMany(models.Permission, {
      through: "RolePermission",
      foreignKey: "roleId",
      as: "permissions",
    });
  };

  return Role;
};
