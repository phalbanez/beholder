const settingsModel = require('../models/settingsModel');
const bcrypt = require('bcryptjs');
const crypto = require('../utils/crypto');

function getSettingsByEmail(email) {
  return settingsModel.findOne({ where: { email } });
}

function getSettings(id) {
  return settingsModel.findOne({ where: { id } });
}

async function updateSettings(id, newSettings) {
  const currentSettings = await getSettings(id);

  if (newSettings.email !== currentSettings.email)
    currentSettings.email = newSettings.email;

  if (newSettings.password)
    currentSettings.password = bcrypt.hashSync(newSettings.password);

  if (newSettings.apiUrl !== currentSettings.apiUrl)
    currentSettings.apiUrl = newSettings.apiUrl;

  if (newSettings.accessKey !== currentSettings.accessKey)
    currentSettings.accessKey = newSettings.accessKey;

  if (newSettings.secretKey !== currentSettings.secretKey)
    currentSettings.secretKey = crypto.encrypt(newSettings.secretKey);

  await currentSettings.save();
}

module.exports = { getSettingsByEmail, getSettings, updateSettings };
