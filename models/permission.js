module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
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
      through: "Role_Permission",
      foreignKey: "permissionId",
      as: "roles",
    });
  };

  return Permission;
};
