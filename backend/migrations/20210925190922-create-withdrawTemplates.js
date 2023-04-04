'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('withdrawTemplates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      coin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amountMultiplier: Sequelize.DECIMAL(10, 2),
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addressTag: Sequelize.STRING,
      network: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('withdrawTemplates', ['coin', 'name'], {
      name: 'withdrawTemplates_coin_name_index',
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('withdrawTemplates', 'withdrawTemplates_coin_name_index');
    await queryInterface.dropTable('withdrawTemplates');
  }
};
