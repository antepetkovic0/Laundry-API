/* eslint-disable strict */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Permissions",
      [
        {
          title: "MANAGE_DASHBOARD",
          description: "Can view dashboard, edit settings, logout",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MANAGE_USER",
          description: "Can read, update and delete users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_SHOP",
          description: "Can read shops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_SHOP",
          description: "Can create shop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "EDIT_SHOP",
          description: "Can edit shop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "DELETE_SHOP",
          description: "Can delete shop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_PRODUCT",
          description: "Can read shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_PRODUCT",
          description: "Can create shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "EDIT_PRODUCT",
          description: "Can edit shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "DELETE_PRODUCT",
          description: "Can delete shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_ORDER",
          description: "Can read orders",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_ORDER",
          description: "Can create orders",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "EDIT_ORDER_STATUS",
          description: "Can edit order status",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MANAGE_CART",
          description: "Can read and edit cart",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
