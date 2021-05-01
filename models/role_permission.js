module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      recipeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ingredientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );

  return RolePermission;
};
