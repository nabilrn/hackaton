"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      idSubject: {
        type: Sequelize.INTEGER,
      },
      idTopic: {
        type: Sequelize.INTEGER,
      },
      idSubTopic: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("request", "reject", "accept"),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Requests");
  },
};
