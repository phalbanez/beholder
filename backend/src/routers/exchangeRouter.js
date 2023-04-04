const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

router.get('/balance/full/:fiat', exchangeController.getFullBalance);

router.get('/balance/:fiat', exchangeController.getBalance);

router.get('/coins', exchangeController.getCoins);

router.post('/withdraw/:id', exchangeController.doWithdraw);

module.exports = router;