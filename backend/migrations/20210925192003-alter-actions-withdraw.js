'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('actions', 'withdrawTemplateId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'withdrawTemplates',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('actions', 'withdrawTemplateId');
  }
};
