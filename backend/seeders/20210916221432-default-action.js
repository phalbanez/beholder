'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const actionId = await queryInterface.rawSelect('actions', { where: {}, }, ['id']);
    if (!actionId) {
      const automationId = await queryInterface.rawSelect('automations', { where: {}, limit: 1 }, ['id']);
      await queryInterface.bulkInsert('actions', [{
        automationId,
        type: 'ALERT_EMAIL',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actions', null, {});
  }
};
