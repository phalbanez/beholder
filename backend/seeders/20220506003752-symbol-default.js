'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const symbol = await queryInterface.rawSelect(
      'symbols',
      { where: {}, limit: 1 },
      ['symbol']
    );
    if (!symbol) {
      return queryInterface.bulkInsert('symbols', [
        {
          symbol: 'BTCBUSD',
          basePrecision: 8,
          quotePrecision: 8,
          minNotional: '0.1',
          minLotSize: '0.1',
          isFavorite: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('symbols', null, {});
  },
};
