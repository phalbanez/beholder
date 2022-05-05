'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { encrypt } = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const settingsId = await queryInterface.rawSelect(
      'settings',
      { where: {}, limit: 1 },
      ['id']
    );
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [
        {
          email: process.env.EMAIL_DEFAULT,
          password: bcrypt.hashSync('123'),
          apiUrl: 'https://testnet.binance.vision/api',
          streamUrl: 'wss://testnet.binance.vision/ws',
          accessKey: '',
          secretKey: encrypt(''),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {});
  },
};
