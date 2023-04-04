const express = require('express');
const router = express.Router();
const symbolsController = require('../controllers/symbolsController');

router.post('/sync', symbolsController.syncSymbols);

router.patch('/:symbol', symbolsController.updateSymbol);

router.get('/:symbol', symbolsController.getSymbol);

router.get('/', symbolsController.getSymbols);

module.exports = router;