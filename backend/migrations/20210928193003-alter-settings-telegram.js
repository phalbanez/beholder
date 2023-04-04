'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('settings', 'telegramBot', {
      type: Sequelize.STRING,
    })

    await queryInterface.addColumn('settings', 'telegramChat', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('settings', 'telegramChat');
    await queryInterface.removeColumn('settings', 'telegramBot');
  }
};
