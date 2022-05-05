const aes = require('aes-js');

const key = aes.utils.utf8.toBytes(process.env.AES_KEY);

if (key.length !== 32)
  throw new Error('Invalid key for AES. Must be 256-bit / 32 bytes.');

function encrypt(text) {
  const bytesInfo = aes.utils.utf8.toBytes(text);
  const aesCRT = new aes.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCRT.encrypt(bytesInfo);
  const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

function decrypt(encryptedHex) {
  const encryptedBytes = aes.utils.hex.toBytes(encryptedHexBytes);
  const aesCRT = new aes.ModeOfOperation.ctr(key);
  const dencryptedBytes = aesCRT.dencrypt(encryptedBytes);
  const text = aes.utils.hex.fromBytes(dencryptedBytes);
  return text;
}

module.exports = { encrypt, decrypt };
