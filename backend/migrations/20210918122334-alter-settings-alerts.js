'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('settings', 'phone', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('settings', 'sendGridKey', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('settings', 'twilioSid', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('settings', 'twilioToken', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('settings', 'twilioPhone', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('settings', 'twilioPhone');
    await queryInterface.removeColumn('settings', 'twilioSid');
    await queryInterface.removeColumn('settings', 'twilioToken');
    await queryInterface.removeColumn('settings', 'sendGridKey');
    await queryInterface.removeColumn('settings', 'phone');
  }
};
