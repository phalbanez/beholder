'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('symbols', 'base', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('symbols', 'quote', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('symbols', 'quote');
    await queryInterface.removeColumn('symbols', 'base');
  }
};
