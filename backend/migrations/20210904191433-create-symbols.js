'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('symbols', {
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      basePrecision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quotePrecision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      minNotional: {
        type: Sequelize.STRING,
        allowNull: false
      },
      minLotSize: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('symbols');
  }
};
