'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('settings', ['email'], {
      name: 'settings_email_index',
      unique: true
     })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('settings', 'settings_email_index');
  }
};
