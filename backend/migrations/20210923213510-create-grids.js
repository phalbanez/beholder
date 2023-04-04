'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grids', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      automationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "automations",
          key: "id"
        }
      },
      orderTemplateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "orderTemplates",
          key: "id"
        }
      },
      conditions: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('grids');
  }
};
