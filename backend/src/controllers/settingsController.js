function getSettings(req, res, next) {
  res.json({
    email: 'contato@gmail.com',
  });
}

module.exports = { getSettings };
