'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderTemplates', {
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
      symbol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      side: {
        type: Sequelize.STRING,
        allowNull: false
      },
      limitPrice: Sequelize.STRING,
      limitPriceMultiplier: Sequelize.DECIMAL(5,2),
      stopPrice: Sequelize.STRING,
      stopPriceMultiplier: Sequelize.DECIMAL(5,2),
      quantity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantityMultiplier: Sequelize.DECIMAL(5,2),
      icebergQty: Sequelize.STRING,
      icebergQtyMultiplier: Sequelize.DECIMAL(5,2),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('orderTemplates', ['symbol', 'name'], {
      name: 'orderTemplates_symbol_name_index',
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('orderTemplates', 'orderTemplates_symbol_name_index');
    await queryInterface.dropTable('orderTemplates');
  }
};
