'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      automationId: Sequelize.INTEGER,
      symbol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      orderId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      clientOrderId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transactTime: {
        type: Sequelize.BIGINT,
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
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isMaker: Sequelize.BOOLEAN,
      limitPrice: Sequelize.STRING,
      stopPrice: Sequelize.STRING,
      avgPrice: Sequelize.DECIMAL(18, 8),
      commission: Sequelize.STRING,
      net: Sequelize.DECIMAL(18, 8),
      quantity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icebergQty: Sequelize.STRING,
      obs: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('orders', ['clientOrderId', 'orderId'], {
      name: 'orders_clientOrderId_orderId_index',
      unique: true
    })

    await queryInterface.addIndex('orders', ['symbol'], { name: 'orders_symbol_index' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('orders', 'orders_symbol_index');
    await queryInterface.removeIndex('orders', 'orders_clientOrderId_orderId_index');
    await queryInterface.dropTable('orders');
  }
};
