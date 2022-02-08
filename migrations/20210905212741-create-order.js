/* eslint-disable strict */

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: "Shops",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      total: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      tax: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      delivery: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      shipping: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      grandTotal: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(
          "PENDING",
          "ACCEPTED",
          "INPROGRESS",
          "PROCESSED",
          "COMPLETED"
        ),
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Orders");
  },
};
