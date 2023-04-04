'use strict';
const { monitorTypes } = require('../src/repositories/monitorsRepository');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedSymbol = '*';
    const monitor = await queryInterface.rawSelect('monitors', { where: { symbol: seedSymbol }, }, ['symbol']);
    if (!monitor) {
      await queryInterface.bulkInsert('monitors', [
        {
          type: monitorTypes.MINI_TICKER,
          broadcastLabel: 'miniTicker',
          symbol: '*',
          interval: null,
          isActive: true,
          isSystemMon: true,
          indexes: null,
          logs: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: monitorTypes.BOOK,
          broadcastLabel: 'book',
          symbol: '*',
          interval: null,
          isActive: false,
          isSystemMon: true,
          indexes: null,
          logs: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: monitorTypes.USER_DATA,
          broadcastLabel: 'balance,execution',
          symbol: '*',
          interval: null,
          isActive: true,
          isSystemMon: true,
          indexes: null,
          logs: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: monitorTypes.CANDLES,
          broadcastLabel: null,
          symbol: 'BTCUSDT',
          interval: '1m',
          isActive: true,
          isSystemMon: false,
          indexes: 'RSI_14',
          logs: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('monitors', null, {});
  }
};
