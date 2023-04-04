'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const automationId = await queryInterface.rawSelect('automations', { where: {}, }, ['id']);
    if (!automationId) {
      await queryInterface.bulkInsert('automations', [
        {
          name: 'Example Strategy',
          symbol: 'BTCUSDT',
          indexes: 'BTCUSDT:RSI_1m',
          conditions: "",
          isActive: false,
          logs: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('automations', null, {});
  }
};
