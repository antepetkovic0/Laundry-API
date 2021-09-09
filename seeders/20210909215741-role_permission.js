/* eslint-disable strict */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "RolePermission",
      [
        {
          roleId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          permissionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          permissionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          permissionId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          permissionId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          permissionId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 1,
          permissionId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          permissionId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("RolePermission", null, {});
  },
};
