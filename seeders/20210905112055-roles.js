/* eslint-disable strict */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          title: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Service",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
