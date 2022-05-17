const symbolsRepository = require('../repositories/symbolsRepository');

async function getSymbols(req, res, next) {
  const symbols = await symbolsRepository.getSymbols();
  res.json(symbols);
}

async function getSymbol(req, res, next) {
  const { symbol } = req.params;
  const symbolData = await symbolsRepository.getSymbol(symbol);
  res.json(symbolData);
}

async function updateSymbol(req, res, next) {
  const newSymbol = req.body;
  const { symbol } = req.params;

  await symbolsRepository.updateSymbol(symbol, newSymbol);
  res.sendStatus(200);
}

async function syncSymbols(req, res, next) {
  res.sendStatus(200);
}

module.exports = {
  getSymbols,
  getSymbol,
  updateSymbol,
  syncSymbols,
};
