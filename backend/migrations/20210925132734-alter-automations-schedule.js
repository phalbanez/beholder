'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('automations', 'schedule', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('automations', 'schedule');
  }
};
