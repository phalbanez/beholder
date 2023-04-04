const express = require('express');
const router = express.Router();
const orderTemplatesController = require('../controllers/orderTemplatesController');

router.delete('/:id', orderTemplatesController.deleteOrderTemplate);

router.get('/all/:symbol', orderTemplatesController.getAllOrderTemplates);

router.get('/:symbol?', orderTemplatesController.getOrderTemplates);

router.patch('/:id', orderTemplatesController.updateOrderTemplate);

router.post('/', orderTemplatesController.insertOrderTemplate);

module.exports = router;