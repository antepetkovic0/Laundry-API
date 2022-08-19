/* eslint-disable strict */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Permissions",
      [
        {
          title: "MANAGE_APP",
          description: "Can view dashboard, edit personal settings",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MANAGE_USERS",
          description: "Can read, update and delete users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_SHOPS",
          description: "Can read shops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_SHOPS",
          description: "Can create shops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "EDIT_SHOPS",
          description: "Can edit shops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "DELETE_SHOPS",
          description: "Can delete shops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_PRODUCTS",
          description: "Can read shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_PRODUCTS",
          description: "Can create shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "EDIT_PRODUCTS",
          description: "Can edit shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "DELETE_PRODUCTS",
          description: "Can delete shop products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "READ_ORDERS",
          description: "Can read orders",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "CREATE_ORDERS",
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
